import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { userConstants } from '../utilities/constants/userConstants'
import { required, minLength, maxLength } from '../utilities/validations/messages';

const userSchema = new Schema({
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

export default userSchema;