import mongoose, { Schema, Document, Model } from "mongoose";

// Type definition for message Schema
export interface Message extends Document {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Defining message schema
const messageSchema: Schema<Message> = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter the content"],
      trim: true,
    },
  },
  { timestamps: true }
);

// Type definition for user schema
export interface User extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyOtp: string;
  verifyOtpExpiry: Date;
  isAcceptingMessages: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Defining user schema
const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter an username"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a fullname"],
      min: [6, "Name should be atleast 3 characters"],
      max: [20, "Name should not exceed 20 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyOtp: {
      type: String,
      required: [true, "Please enter the verify otp"],
      unique: true,
    },
    verifyOtpExpiry: {
      type: Date,
      required: [true, "Please enter the verify otp expiry"],
    },
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);
export default UserModel;
