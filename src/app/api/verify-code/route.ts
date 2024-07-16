import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // connect to db
  await connectDB();

  try {
    // get data from request body
    const { username, code } = await request.json();

    // check if the user with the username exists in the db or not
    const user = await UserModel.findOne({ username });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not found",
        },
        { status: 400 }
      );
    }

    // validation of code
    const isCodeValid = await UserModel.findOne({
      verifyCode: code,
      verifyCodeExpiry: { $gt: Date.now() },
    });

    if (!isCodeValid) {
      // return the response
      return NextResponse.json(
        {
          success: false,
          message: "Invalid code or code has expired",
        },
        { status: 400 }
      );
    }

    // set the user to verified and remove the code and code expiry from the db
    await UserModel.updateOne(
      { _id: user._id },
      { $unset: { verifyCode: "", verifyCodeExpiry: "" } }
    );
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "Username is verified successfully",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    console.error("Something went wrong while verifying the code");
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
