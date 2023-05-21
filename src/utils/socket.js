import { io } from "socket.io-client";

const socket = (userId) => {
  return io("http://localhost:5001", {
    cors: {
      origin: "http://localhost:5001",
      methods: ["GET", "POST"],
    },
    transports: ["websocket"],
    auth: {
      token: localStorage.getItem("token"),
    },
    query: {
      id: userId,
    },
  });
};

export default socket;
