import mongoose, { Schema, Document, Model } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,
            required: [true, "Please provide the content"],
            trim: true,
            min: [1, "Content must be atleast 1 characters"],
            max: [100, "Content must not exceed 100 characters"],
        },
    },
    { timestamps: true }
);

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
    verifyOtp: number | undefined;
    verifyOtpExpiry: Date | undefined;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            trim: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
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
            type: Number,
            required: [true, "Please provide the otp"],
            length: 6,
        },
        verifyOtpExpiry: {
            type: Date,
            required: [true, "Please provide the otp expiry"],
        },
    },
    { timestamps: true }
);

const UserModel =
    (mongoose.models.User as Model<User>) ||
    mongoose.model<User>("User", userSchema);
export default UserModel;
