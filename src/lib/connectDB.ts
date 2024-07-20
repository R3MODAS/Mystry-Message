import { DB_NAME } from "@/utils/constants";
import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}
const connection: Connection = {};

async function connectDB(): Promise<void> {
  // check if the db is already connected or not
  if (connection.isConnected) {
    console.log(`Already connected to MongoDB !!`);
    return;
  }

  // if the db is not connected
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    connection.isConnected = db.connections[0].readyState;
    console.log(
      `MongoDB is connected successfully !! DB Host: ${db.connection.host}`
    );
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    console.log(`Failed to connect to MongoDB: `, errMsg);
    process.exit(1);
  }
}

export default connectDB;
