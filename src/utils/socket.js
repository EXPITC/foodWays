import { io } from "socket.io-client";

const socket = (userId) => {
  return io(process.env.REACT_APP_API_SOCKET, {
    cors: {
      origin: process.env.REACT_APP_API_SOCKET,
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
