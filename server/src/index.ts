import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverPort = process.env.SERVER_PORT;
const dbConection = process.env.DB_CONNECTION as string;

app.use('/', (req, res) => {
  res.json('Welcome to your online paradise!');
});

app.listen(serverPort,() =>{
  console.log(`Listening on port ${serverPort}`);
});

// mongooseDB connection
mongoose.connect(dbConection, ()=>{
  console.log("Connection to DB established!");
});
