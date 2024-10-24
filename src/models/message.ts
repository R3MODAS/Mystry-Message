import { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export const messageSchema: Schema<IMessage> = new Schema(
    {
        content: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);
