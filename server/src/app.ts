// Load environment variables from .env file
import "dotenv/config";

import express from "express";
import socketService from "./services/socket.service";
import mongoose from "mongoose";

// Connect to MongoDB(uri from env variable)
mongoose.connect(process.env.MONGODB_URI);
//When connected to MongoDB, log message
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
//Port for express server to listen on
const PORT = process.env.PORT || 4000;
const app = express();

// Creating an HTTP server for socket connections
const httpServer = app.listen(PORT, () => {
  console.log("listening on port http://localhost:" + PORT);
});

//Send  http server to socket service
socketService.handleSocketIo(httpServer);
