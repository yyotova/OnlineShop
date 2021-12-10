import mongoose from 'mongoose';
import userSchema from '../models/user';
import { hashPassword } from '../utilities/encription';

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    const hash = await hashPassword(user.password);
    user.password = hash;
  }

  next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel;