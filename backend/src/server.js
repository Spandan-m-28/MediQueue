import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import http from "http";
import { initializeSocket } from "./sockets/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Connecting to mongoDB
connectDB();

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
