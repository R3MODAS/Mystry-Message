import { MONGODB_URL } from "@/config";
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

interface Connection {
    isConnected?: number;
}
const connection: Connection = {};

export const connectMongoDB = async (): Promise<void> => {
    // if the db is already connected
    if (connection.isConnected) {
        console.log(`MongoDB is already connected :)`);
        return;
    }

    try {
        // If the db is not connected
        const db = await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME
        });
        connection.isConnected = db.connections[0].readyState;
        console.log(`MongoDB is connected successfully`);
    } catch (err) {
        console.error(`Failed to connect to MongoDB: `, err);
        process.exit(1);
    }
};
