import mongoose from "mongoose";

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log(`Already connected to MongoDB`);
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {});
    connection.isConnected = db.connections[0].readyState;
    console.log(
      `MongoDB is connected successfully !! DB Host: ${db.connection.host}`
    );
  } catch (err) {
    console.log(`Failed to connect to MongoDB with err`, err);
    process.exit(1);
  }
}

export default dbConnect;
