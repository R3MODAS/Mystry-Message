import mongoose, { Schema, Document, Model } from "mongoose";

// Type definition for message schema
export interface Message extends Document {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition for message
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
  isAcceptingMessages: boolean;
  messages: Message[];
  verifyOtp: string;
  verifyOtpExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition for user
const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter an username"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
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
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
    messages: [messageSchema],
    verifyOtp: {
      type: String,
      required: [true, "Please enter the verify otp"],
      trim: true,
    },
    verifyOtpExpiry: {
      type: Date,
      required: [true, "Please enter the verify otp expiry"],
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);
export default UserModel;
