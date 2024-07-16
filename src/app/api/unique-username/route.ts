import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

// Create a username schema
const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  // connect to db
  await connectDB();

  try {
    // get the username from query params
    const queryParam = {
      username: request.nextUrl.searchParams.get("username"),
    };

    // validation of username
    const result = usernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      // get the errors regarding the username
      const usernameErrors = result.error?.format().username?._errors || [];

      // return the error response
      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    // get the data from zod validation result
    const { username } = result.data;

    // check if the user with the username is verified exists in the db or not
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    console.error("Something went wrong while checking the unique username");
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
