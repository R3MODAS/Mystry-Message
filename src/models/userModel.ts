import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Defining type for message schema
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

// Defining the message schema
const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

// Defining type for user schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Defining the user schema
const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    trim: true,
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
  verifyCode: {
    type: String,
    required: [true, "Please enter a verify code"],
    trim: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
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
});

// Hashing the password
userSchema.pre("save", async function (next) {
  // if the password is not new or modified then don't hash it
  if (!this.isModified("password")) return next();

  // if the password is new or modified then hash it
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Defining the user model for the user schema
const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
