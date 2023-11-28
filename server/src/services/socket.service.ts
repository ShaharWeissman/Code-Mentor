import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import {
  getAllCodeBlocks,
  getCodeBlock,
  updateCodeBlock,
} from "./codeblock.service";

// Function to make a socket leave all rooms except its own default room
function leaveAllRoomsExceptOwn(socket: Socket) {
  socket.rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room);
    }
  });
}
//Function to emit all the codeBlocks to connected client
async function emitCodeBlocks(socket: Socket) {
  try {
    const codeBlockArr = await getAllCodeBlocks();
    socket.emit("codeBlocks", { collection: codeBlockArr });
  } catch (error) {
    console.error(error);
  }
}

//Function for handling socket.io operations
function handleSocketIo(httpServer: HttpServer): void {
  const options = { cors: { origin: "*" } };

  //Create the socket.io server instance
  const io = new SocketIoServer(httpServer, options);

  //The server listen to client connections not async
  io.on("connection", (socket: Socket) => {
    console.log("client is connected to socket.io server", { id: socket.id });
    //Emit the codeBlocks to the connected client
    emitCodeBlocks(socket);

    //Handle event when a client join the rome
    socket.on("joinedRoom", async ({ roomId }) => {
      const codeBlockDocument = await getCodeBlock(roomId); //fetch the codeBlock document by roomId
      if (!codeBlockDocument?.code) {
        throw new Error("code block not found");
      }

      const { code, language } = codeBlockDocument;
      //emit the language(for the syntax highlight code) and the code
      socket.emit("sendCode", { code, language });
      console.log({ roomName: roomId });

      leaveAllRoomsExceptOwn(socket);
      socket.join(roomId);

      // After joining the room, fetch and log all clients in that room
      const roomOccupants = io.sockets.adapter.rooms.get(roomId);
      //
      console.log(`Clients in room ${roomId}:`, roomOccupants);
      const role: "mentor" | "student" =
        [...roomOccupants].length === 1 ? "mentor" : "student";

      socket.emit("role", { role });
      console.log(`role of ${socket.id} is: ${role}`);
    });

    // Handle event when client emits the code changes
    socket.on("emitCodeChange", (data: { _id: string; code: string }) => {
      // 1.save code to db and emit changes to other clients in the room
      console.log("code:", data);
      updateCodeBlock(data.code, data._id);
      socket.to(data._id).emit("codeEdited", data);
    });
    //handle disconnect
    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });
  });
}

export default {
  handleSocketIo,
};
