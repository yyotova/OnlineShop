import mongoose, { Schema, Model, ObjectId } from 'mongoose';
import validator from 'validator';
import { userConstants } from '../utilities/constants/userConstants'
import { required, minLength, maxLength } from '../utilities/validations/messages';
import { hashPassword, validatePassword } from '../utilities/encription';
import { createToken } from '../utilities/authentication';

export interface IUser {
  _id: string | ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  validatePassword(password: string): boolean;
  generateAuthToken(): string;
}

interface UserModel extends Model<IUser> {
  findByEmail(emaild: string): IUser;
}

const UserSchema = new Schema<IUser, UserModel>({
  firstName: {
    type: String,
    required: [true, required('First name')],
    minlength: 4,
    maxlength: 14,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, required('Last name')],
    minlength: 4,
    maxlength: 14,
    trim: true,
  },
  email: {
    type: String,
    required: [true, required('Email')],
    minlength: [
      userConstants.email.minLength,
      minLength('Usename', userConstants.email.minLength)
    ],
    maxlength: [
      userConstants.email.maxLength,
      maxLength('Username', userConstants.email.maxLength)
    ],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid message"
    }
  },
  password: {
    type: String,
    required: [true, required("Password")],
    minlength: [
      userConstants.password.minLength,
      minLength("Password", userConstants.password.minLength)
    ],
    maxlength: [
      userConstants.password.maxLength,
      maxLength("Password", userConstants.password.maxLength)
    ]
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

UserSchema.pre("save", async function(this: any, next) {
  const user = this;

  if (user.isModified("password")) {
    const hash = await hashPassword(user.password);
    user.password = hash;
  }

  next();
});

UserSchema.statics.findByEmail = async function(email: string) {
  try {
    const User = this;
    const user = await User.findOne({ email });

    return user;
  }catch (e) {
    console.error(e);
  }
};

UserSchema.methods.validatePassword = function(password: string) {
  const user = this;
  const hashedPassword = user.password;

  return validatePassword(password, hashedPassword);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const userId = user._id;

  return createToken(userId);
};

const User = mongoose.model<IUser, UserModel>('User', UserSchema);

export default User;
