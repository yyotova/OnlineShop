import mongoose from 'mongoose';
import User, { IUser } from "../models/user";
import { decodeToken } from '../utilities/authentication';

export const isAdmin = async (req, res, next) => {
  const userId = req.user.id as mongoose.Schema.Types.ObjectId;

  const user: IUser | null = await User.findById(userId);

  if (req.user && user?.isAdmin) {
    return next();
  }

  return res.status(403).json({ message: "User is not an admin!" });
};

export const authenticate = async (req, res, next) => {
  const token = req.header("x-auth");

  if (!token) {
    return res.boom.unathorized("Unauthorized");
  }

  try {
    const { _id } = decodeToken(token) as IUser;

    if (!_id) {
      return res.boom.unathorized("Unauthorized");
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.boom.unauthorized("Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};