import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import itemRoute from "./routes/itemRoute";
import orderRoute from "./routes/orderRoute";
import cartRoute from "./routes/cartRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverPort = process.env.SERVER_PORT as any;
const dbConnection = process.env.DB_CONNECTION as string;

app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);

// mongooseDB connection
mongoose
  .connect(dbConnection)
  .then(() => console.log("Connection to DB established!"))
  .catch((err) => console.log("pav ", err));

app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});
