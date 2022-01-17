import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ObjectId } from "mongoose";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import itemRoute from "./routes/itemRoute";
import orderRoute from "./routes/orderRoute";
import cartRoute from "./routes/cartRoute";
import categoryRouter from "./routes/categoryRouter";
import { Server } from "socket.io";
import Message from "./models/messageModel";

export interface MessageObject {
  userId: string;
  message: string;
  time: string;
}

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
app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/categories", categoryRouter);

socketio.on("connection", (socket) => {
  socket.on("getUserMessages", async (userId: string) => {
    try {
      const messages = await Message.find({
        userId: new mongoose.Types.ObjectId(userId.trim()),
      });
      socket.emit("listMessages", messages);
    } catch (error: any) {
      console.error(error);
    }
  });

  socket.on("chatMessage", async (messageObject: MessageObject) => {
    try {
      const newMessage = new Message({
        userId: new mongoose.Types.ObjectId(messageObject.userId.trim()),
        message: messageObject.message,
        time: messageObject.time,
      });

      const returnedMessage = await newMessage.save();
      if (returnedMessage) {
        socket.emit("returnedFromServerMessage", returnedMessage);
      }
    } catch (error: any) {
      console.error(error);
    }
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
