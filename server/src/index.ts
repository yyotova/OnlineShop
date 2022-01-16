import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import itemRoute from "./routes/itemRoute";
import orderRoute from "./routes/orderRoute";
import cartRoute from "./routes/cartRoute";
import categoryRouter from "./routes/categoryRouter";
import http from "http";
import { Server } from "socket.io";
import { formatMessage } from "./routes/chatRouter";

dotenv.config();

const app = express();
const server = http.createServer(app);
const socketio = new Server(server, { cors: { origin: "*" } });
const serverPort = process.env.SERVER_PORT as any;
const dbConnection = process.env.DB_CONNECTION as string;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/categories", categoryRouter);

socketio.on("connection", (socket) => {
  socket.emit("message", formatMessage("Ivan", "Welcome"));

  // Emit everybody except the client that is connecting.
  // Do not need to notify him
  socket.broadcast.emit("message", "A user has joined the chat!");

  // Runs when client disconnects
  socket.on("disconnect", () => {
    socketio.emit("message", "A user has left the chat");
  });

  // Listen for chat message
  socket.on("chatMessage", (message) => {
    console.log(message);
  });
});

server.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});

// mongooseDB connection
mongoose
  .connect(dbConnection)
  .then(() => {
    console.log("DB connection established!");
  })
  .catch((err) => {
    console.error("Error connecting to the DB", err);
  });
