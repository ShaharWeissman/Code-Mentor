import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import {
  getCodeBlocks,
  getRoomTitles,
  updateCodeBlock,
  updateCodeBlockTitle,
} from "./codeblock.service";

function leaveAllRoomsExceptOwn(socket: Socket) {
  socket.rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room);
    }
  });
}

async function emitTitles(socket: Socket) {
  const titles = await getRoomTitles();
  socket.emit("sendTitles", titles);
}

function handleSocketIo(httpServer: HttpServer): void {
  const options = { cors: { origin: "*" } };
  const io = new SocketIoServer(httpServer, options);

  io.on("connection", async (socket: Socket) => {
    console.log("Client is connected to socket.io server", { id: socket.id });
    emitTitles(socket);

    socket.on("joinedRoom", async ({ roomName }) => {
      const codeBlockDocument = await getCodeBlocks(roomName);
      if (!codeBlockDocument?.code) {
        throw new Error("Code block not found");
      }

      const { code } = codeBlockDocument;
      socket.emit("sendCode", { code });

      leaveAllRoomsExceptOwn(socket);
      socket.join(roomName);

      const roomOccupants = io.sockets.adapter.rooms.get(roomName);
      console.log(`Clients in room ${roomName}:`, roomOccupants);

      const role: "mentor" | "student" =
        [...roomOccupants].length === 1 ? "mentor" : "student";
      socket.emit("role", { role });
      socket.emit("codeEdited", { code, roomName });
      console.log(`Role of ${socket.id} is: ${role}`);
    });

    socket.on("emitCodeChange", (data: { roomName: string; code: string }) => {
      console.log("Code:", data.code);
      updateCodeBlock(data.code, data.roomName);
      io.to(data.roomName).emit("codeEdited", {
        roomName: data.roomName,
        code: data.code,
      });
    });

    socket.on(
      "titleChange",
      async (data: { title: string; roomName: string }) => {
        console.log(data.roomName);
        try {
          const updatedCodeBlock = await updateCodeBlockTitle(
            data.roomName,
            data.title
          );

          if (updatedCodeBlock) {
            io.to(data.roomName).emit("changedTitle", {
              roomName: data.roomName,
            });

            const allRooms = Array.from(io.sockets.adapter.rooms.keys());
            io.emit("roomListUpdated", allRooms);
          } else {
            console.log(`No code block found for room: ${data.roomName}`);
          }
        } catch (error) {
          console.error(`Error updating room name to ${data.roomName}:`, error);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });
  });
}

export default {
  handleSocketIo,
};
