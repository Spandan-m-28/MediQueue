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
      console.log(`Socket ${socket.id} joined room queue_${queueId}`);
    });

    socket.on("leaveQueueRoom", (queueId) => {
      socket.leave(`queue_${queueId}`);
      console.log(`Socket ${socket.id} left room queue_${queueId}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
};

// Small helper so every controller doesn't repeat io.to(`queue_${id}`).emit(...).
// Always emits the SAME event name ("queueUpdated") with a consistent payload
// shape, so the frontend only needs one listener.
//
// payload shape:
//   {
//     currentToken: number,
//     queueStatus: "active" | "paused" | "closed",
//     totalTokens?: number,               // include when it changed (join/leave)
//     activeToken: { tokenNumber, status } | null   // the token that was just touched, if any
//   }
const emitQueueUpdate = (queueId, payload) => {
  const io = getIO();
  io.to(`queue_${queueId}`).emit("queueUpdated", payload);
};

export { initializeSocket, getIO, emitQueueUpdate };