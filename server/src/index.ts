import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import itemRouter from "./routes/itemRouter";
import orderRouter from "./routes/orderRouter";
import cartRouter from "./routes/cartRouter";
import categoryRouter from "./routes/categoryRouter";
import sectionRouter from "./routes/sectionRouter";
import { Server } from "socket.io";
import { formatMessage } from "./routes/chatRouter";

dotenv.config();

const app = express();
const serverPort = process.env.SERVER_PORT as any;
const dbConnection = process.env.DB_CONNECTION as string;
const server = app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});
const socketio = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sections", sectionRouter);

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

// mongooseDB connection
mongoose
  .connect(dbConnection)
  .then(() => {
    console.log("DB connection established!");
  })
  .catch((err) => {
    console.error("Error connecting to the DB", err);
  });
