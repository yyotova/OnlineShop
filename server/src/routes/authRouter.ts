import express from 'express';
import User, { IUser } from '../models/user';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    const user = await User.findByEmail(email);
  
    if(!user) {
      return res.status(400).json({ message: 'There is no user registered with this email.' });
    }
  
    const isPasswordValid = user.validatePassword(password);
    
    if(!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid login credentials.' });
    }
  
    const token = await user.generateAuthToken();
  
    return res
    .header("x-auth", token)
    .status(200)
    .send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    next(error)
  }
});

router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password, isAdmin } = req.body as IUser;

  try {
    let user = new User({ firstName, lastName, email, password, isAdmin });

    await user.validate();

    user = await user.save();
    const token = await user.generateAuthToken();

    return res
      .header("x-auth", token)
      .status(201)
      .send({
        _id: user._id
      })

  } catch (error) {
    next(error);
  }
});

export default router;
