import mongoose from 'mongoose';
import userSchema from '../models/user';
import { hashPassword, validatePassword } from '../utilities/encription';
import { createToken } from '../utilities/authentication';

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    const hash = await hashPassword(user.password);
    user.password = hash;
  }

  next();
});

userSchema.statics.findByEmail = async function(email: string) {
  const User = this;
  const user = await User.findOne({ email });

  return user;
};

userSchema.methods.validatePassword = async function(password: string) {
  const user = this;
  const hashedPassword = user.password;

  return await validatePassword(password, hashedPassword);
};

userSchema.methods.generateAuthToken = function() {
  const user = this;
  const userId = user._id;

  return createToken(userId);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;