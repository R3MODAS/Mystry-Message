import { DB_NAME } from "@/utils/constants";
import mongoose from "mongoose";

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

async function connectDB(): Promise<void> {
    if (connection.isConnected) {
        console.log(`Already connected to MongoDB !!`);
        return;
    }
    try {
        const db = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        connection.isConnected = db.connections[0].readyState;
        console.log(
            `MongoDB is connected successfully !! DB Host: ${db.connection.host}`
        );
    } catch (err) {
        const errMsg = (err as Error).message;
        console.error(`Failed to connect to MongoDB with error: `, errMsg);
        process.exit(1);
    }
}

export default connectDB;
