import mongoose, { Schema, Document, Model } from "mongoose";

// Contact schema (type)
interface Contact extends Document {
    name: string;
    email: string;
    message: string;
}

// Contact schema
const contactSchema: Schema<Contact> = new Schema({
    name: String,
    email: String,
    message: String
});

// Contact model
export const ContactModel =
    (mongoose.models.Contact as Model<Contact>) ||
    mongoose.model<Contact>("Contact", contactSchema);
