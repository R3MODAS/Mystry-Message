import { MONGODB_URL } from "@/config";
import { DB_NAME } from "@/utils/constants";
import mongoose from "mongoose";

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

export const connectMongoDB = async () => {
    // If the connection to mongodb is already made
    if (connection.isConnected) {
        console.log(`Already connected to MongoDB`);
        return;
    }

    // If the connection to mongodb is new
    try {
        const db = await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME
        });
        connection.isConnected = db.connections[0].readyState;
        console.log(`MongoDB is connected successfully`);
    } catch (err: any) {
        console.log(`Failed to connect MongoDB`, err.message);
        process.exit(1);
    }
};
