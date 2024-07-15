import { DB_NAME } from "@/utils/constants";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  // If the db is already connected
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    // If the db is not connected
    const db = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    connection.isConnected = db.connections[0].readyState;
    console.log(
      `MongoDB is connected successfully !! DB Host: ${db.connection.host}`
    );
  } catch (err: any) {
    console.log(`Failed to connect to MongoDB`, err.message);
    process.exit(1);
  }
}

export default connectDB;
