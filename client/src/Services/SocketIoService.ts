import { Socket, io } from "socket.io-client";

export interface CodeBlock {
  code: string;
  roomName: string;
}
const url = import.meta.env.VITE_SOCKETIO_URL;
class SocketIoService {
  public socket: Socket;
  
  constructor() {
    console.log("SocketIoService-", url)
    console.log("SocketIoService-", import.meta.env)
    this.socket = io(url);

    this.socket.on("connect", () => {
      console.log("Connected to SocketIO");
    });
    this.socket.on("disconnect", () => {
      console.log("Disconnected from SocketIO");
    });
  }

  connect() {
    this.socket.connect();
  }
}
const socketIoService = new SocketIoService();

export default socketIoService;
