import { Server } from "socket.io";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: `${process.env.FRONTEND_URI}`,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinQueue", (queueId) => {
      socket.join(`queue_${queueId}`);

      console.log(`Socket ${socket.id} joined queue_${queueId}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  return io;
};

export { initializeSocket, io };
