import express from 'express';
import User from '../models/user';
import { isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', isAdmin, async (req, res) => {
  const users = await User.find({});

  return res.status(200).json(users.map(user => {
    const { firstName, lastName, email } = user;
    return { firstName, lastName, email };
  }));
});

export default router;