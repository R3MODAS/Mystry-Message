import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  // connect to db
  connectDB();

  try {
    // get data from request body
    const { username, otp } = await request.json();

    // decode the username
    const decodedUsername = decodeURIComponent(username);

    // check if the user exists in the db or not
    let user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not registered",
        },
        { status: 400 }
      );
    }

    // verification of otp
    user = await UserModel.findOne({
      otp,
      otpExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Invalid code or code has expired. Please sign up to get a new code",
        },
        { status: 401 }
      );
    }

    // verify the user and save the changes
    user.isVerified = true;
    user.otp = undefined
    user.otpExpiry = undefined
    await user.save({ validateBeforeSave: false });

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "User is verified successfully",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    console.error(errMsg);
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
