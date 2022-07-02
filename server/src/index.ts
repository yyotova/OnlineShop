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
import { Server } from "socket.io";
import Message, { MessageObject } from "./models/messageModel";
import User from "./models/user";
import { notExist } from "./utilities/validations/messages";
import sectionRouter from "./routes/sectionRouter";

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
  socket.on("userAuthenticate", (userInfo: any) => {
    socket.join(`users/${userInfo._id}`);

    if (userInfo.isAdmin) {
      socket.join("admins");
    }
  });

  socket.on("getAllMessageObjects", async () => {
    try {
      const existingMessageObjects = await Message.find({});

      let result: MessageObject[] = [];
      for (const m of existingMessageObjects) {
        const existingUser = await User.findOne({ _id: m.userId });
        if (!existingUser) {
          throw new Error(notExist("user", "id", m.userId));
        }

        const username = existingUser.email.substr(
          0,
          existingUser.email.indexOf("@")
        );

        result = result.concat({
          userId: m.userId.toString(),
          username: username,
          messages: m.messages,
        });
      }

      socket.emit("listAllMessageObjects", result);
    } catch (error: any) {
      console.error(error);
    }
  });

  socket.on("getUserMessages", async (userId: string) => {
    try {
      const existingUser = await User.findOne({ _id: userId.trim() });
      if (!existingUser) {
        throw new Error(notExist("user", "id", userId));
      }

      const returnedMessage = await Message.findOne({
        userId: new mongoose.Types.ObjectId(userId.trim()),
      });
      const username = existingUser.email.substr(
        0,
        existingUser.email.indexOf("@")
      );
      let message: MessageObject;
      if (returnedMessage) {
        message = {
          userId: returnedMessage.userId.toString(),
          username: username,
          messages: returnedMessage.messages,
        };
      } else {
        message = {
          userId: existingUser._id,
          username: username,
          messages: [],
        };
      }

      socket.emit("listMessages", message);
    } catch (error: any) {
      console.error(error);
    }
  });

  socket.on("sendMessage", async (messageObject: MessageObject) => {
    try {
      const userId = messageObject.userId.trim();
      const existingUser = await User.findOne({ _id: userId });
      if (!existingUser) {
        throw new Error(notExist("user", "id", userId));
      }

      const existingMessageObject = await Message.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      });
      if (existingMessageObject) {
        existingMessageObject.messages = existingMessageObject.messages.concat(
          messageObject.messages[0]
        );
        await existingMessageObject.save();
        socket.emit("newMessage", messageObject.messages[0]);

        if (messageObject.toAdmin) {
          socketio.to("admins").emit("newMessage", messageObject.messages[0]);
        } else {
          socketio
            .to(`users/${messageObject.userId}`)
            .emit("newMessage", messageObject.messages[0]);
        }
      } else {
        const newMessage = new Message({
          userId: new mongoose.Types.ObjectId(userId),
          messages: messageObject.messages,
        });
        const returnedMessage: MessageObject = await newMessage.save();
        returnedMessage.username = existingUser.email.substr(
          0,
          existingUser.email.indexOf("@")
        );
        socket.emit("newMessage", returnedMessage.messages[0]);

        if (returnedMessage.toAdmin) {
          socketio.to("admins").emit("newMessage", returnedMessage.messages[0]);
        } else {
          socketio
            .to(`users/${returnedMessage.userId}`)
            .emit("newMessage", returnedMessage.messages[0]);
        }
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
