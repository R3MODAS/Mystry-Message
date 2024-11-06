import { MONGODB_URL } from "@/config";
import { DB_NAME } from "@/utils/constants";
import mongoose from "mongoose";

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

export const connectMongoDB = async (): Promise<void> => {
    // If the db connection is already made
    if (connection.isConnected) {
        console.log(`Already connected to MongoDB`);
        return;
    }

    try {
        // If the db connection is new
        const db = await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME
        });

        // Store the connection value
        connection.isConnected = db.connections[0].readyState;

        console.log(`MongoDB is connected successfully`);
    } catch (err) {
        console.error(`Database connection failed:`, err);

        process.exit(1);
    }
};
