import { Socket, io } from "socket.io-client";

//Define the stracture of codeBlock object
export interface CodeBlock {
  code: string;
  roomName: string;
}
// Getting the socket server url
const url = import.meta.env.VITE_SOCKETIO_URL;
//Class service - manage socket communication
class SocketIoService {
  public socket: Socket;

  constructor() {
    console.log("url:", url);
    console.log("url:", import.meta.env);

    //Create connection with the provided socket server url
    this.socket = io(url);

    //listner to socket connection event
    this.socket.on("connect", () => {
      console.log("Connected to SocketIO");
    });
    //for disconnect event
    this.socket.on("disconnet", () => {
      console.log("Disconnected from SocketIO");
    });
  }
  //starts the connection process
  connect() {
    this.socket.connect();
  }
}
//instance of SocketIOService class - for use
const socketIoService = new SocketIoService();

export default socketIoService;
