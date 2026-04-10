import dotenv from "dotenv";
dotenv.config(); // MUST be at top

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import initSocket from "./sockets/quizSocket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

initSocket(io);
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});