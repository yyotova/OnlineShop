import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverPort = process.env.SERVER_PORT;
const dbConection = process.env.DB_CONNECTION as string;

// app.use('/', (req, res) => {
//   res.json('Welcome to your online paradise!');
// });

app.use('/auth',authRouter);
app.use('/users',userRouter);

app.listen(serverPort,() =>{
  console.log(`Listening on port ${serverPort}`);
});

// mongooseDB connection
mongoose.connect(dbConection)
  .then(() => {
    console.log('DB connection established!');
  })
  .catch(err => {
    console.error('Error connecting to the DB', err);
  });
