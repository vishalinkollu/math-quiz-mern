import { io } from "socket.io-client";

const socket = io("https://math-quiz-mern.onrender.com", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;