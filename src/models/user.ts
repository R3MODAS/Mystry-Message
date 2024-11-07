import mongoose, { Schema, Document, Model } from "mongoose";
import { Message, messageSchema } from "./message";

// User schema (type)
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

// User schema
const userSchema: Schema<User> = new Schema(
    {
        username: String,
        email: String,
        password: String,
        isVerified: {
            type: Boolean,
            default: false
        },
        isAcceptingMessages: {
            type: Boolean,
            default: true
        },
        messages: [messageSchema]
    },
    { timestamps: true }
);

// User model
export const UserModel =
    (mongoose.models.User as Model<User>) ||
    mongoose.model<User>("User", userSchema);
