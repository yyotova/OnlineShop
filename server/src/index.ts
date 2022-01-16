import express from "express";
// import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import itemRoute from "./routes/itemRoute";
import orderRoute from "./routes/orderRoute";
import cartRoute from "./routes/cartRoute";
import categoryRouter from "./routes/categoryRouter";

const socket = require("socket.io");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverPort = process.env.SERVER_PORT as any;
const dbConnection = process.env.DB_CONNECTION as string;

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/categories", categoryRouter);

const server = app.listen(serverPort, () => {
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

  // Socket setup
const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
});