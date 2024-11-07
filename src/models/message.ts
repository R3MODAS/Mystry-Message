import { Schema, Document } from "mongoose";

// Message schema (type)
export interface Message extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

// Message schema
export const messageSchema: Schema<Message> = new Schema(
    {
        content: String
    },
    { timestamps: true }
);
