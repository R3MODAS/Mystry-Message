import mongoose, { Schema, Document, Model } from "mongoose";

// Type definition for message schema
export interface Message extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

// Message schema definition
const messageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,
            required: [true, "Please provide the content"],
            trim: true,
        },
    },
    { timestamps: true }
);

// Type definition for user schema
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
    otp: number | undefined;
    otpExpiry: Date | undefined;
    createdAt: Date;
    updatedAt: Date;
}

// User schema definition
const userSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide an username"],
            unique: true,
            lowercase: true,
            trim: true,
            minLength: [6, "Username must be atleast 6 characters"],
            maxLength: [10, "Username must not exceed 10 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            trim: true,
            minlength: [8, "Password must be atleast 8 characters"],
            maxlength: [20, "Password must not exceed 20 characters"],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            ],
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
        otp: {
            type: Number,
            required: [true, "Please provide an otp"],
        },
        otpExpiry: {
            type: Date,
            required: [true, "Provide provide the otp expiry"],
        },
    },
    { timestamps: true }
);

// Model definition for user
const UserModel =
    (mongoose.models.User as Model<User>) ||
    mongoose.model<User>("User", userSchema);
export default UserModel;
