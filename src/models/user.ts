import mongoose, { Schema, Document, Model } from "mongoose";
import { IMessage, messageSchema } from "./message";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    verifyOtp: string;
    verifyOtpExpiry: Date;
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            trim: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAcceptingMessages: {
            type: Boolean,
            default: true
        },
        messages: [messageSchema],
        verifyOtp: {
            type: String,
        },
        verifyOtpExpiry: {
            type: Date,
        }
    },
    { timestamps: true }
);

export const UserModel =
    (mongoose.models.User as Model<IUser>) ||
    mongoose.model<IUser>("User", userSchema);
