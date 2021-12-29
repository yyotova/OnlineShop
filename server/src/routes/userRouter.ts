import express from 'express';
import User from '../models/user';
import { isAdmin, authenticate } from '../middlewares/auth';
import mongoose, { ObjectId } from 'mongoose';

const router = express.Router();

router.get('/', authenticate, isAdmin, async (req, res) => {
  const users = await User.find({});

  return res.status(200).json(users.map(user => {
    const { firstName, lastName, email } = user;
    return { firstName, lastName, email };
  }));
});

router.delete('/delete/:id', authenticate, isAdmin, async (req, res) => {
  try {
    let userId = req.params.id;

    const userToDelete = await User.findByIdAndDelete(new mongoose.Types.ObjectId(userId.trim()));
    
    if (userToDelete) {
      res.status(200).json({ message: 'User deleted!', data: userToDelete });
    }
  } catch (err: any) {
    res.json({ message: err.message });
  }
});

router.put('/:id/edit', authenticate, async (req, res) => {
  try {;
    const userId = req.params.id.trim();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: 'User Updated', data: updatedUser });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;