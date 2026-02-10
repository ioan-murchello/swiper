import { Server } from "socket.io";

let io;

const connectedUsers = new Map();
// { userId: socketId }

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });
  
  //* Middleware to authenticate socket connections
  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return next(new Error("Invalid user ID"));

    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    connectedUsers.set(socket.userId, socket.id);

    socket.on("disconnect", () => {
      connectedUsers.delete(socket.userId);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const getConnectedUsers = () => connectedUsers;
