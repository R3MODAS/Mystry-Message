import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  // connection to db
  await dbConnect();

  try {
    // get data from request body
    const { username, email, password } = await request.json();
  } catch (err) {
    console.error("Error while registering user", err);
    return Response.json(
      {
        success: false,
        message: "Error while registering user",
      },
      {
        status: 500,
      }
    );
  }
}
