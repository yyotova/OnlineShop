import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverPort = process.env.SERVER_PORT;

app.use('/', (req, res) => {
  res.json('Welcome to your online paradise!');
});

app.listen(serverPort,() =>{
  console.log(`Listening on port ${serverPort}`);
});
