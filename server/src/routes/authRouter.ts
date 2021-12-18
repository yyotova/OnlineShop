import express from 'express';
import User from '../models/user';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required.' });
  }

  const user = User.findByEmail(email);

  if(!user) {
    res.status(400).json({ message: 'There is no user registered with this email.' });
  }

  const isPasswordValid = user.validatePassword(password);
});
