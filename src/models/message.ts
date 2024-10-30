import { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export const messageSchema: Schema<Message> = new Schema(
    {
        content: String
    },
    { timestamps: true }
);
