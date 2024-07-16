import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import otpGenerator from "otp-generator";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  // connect to db
  await connectDB();

  try {
    // get data from request body
    const { username, email, password } = await request.json();

    // check if the verified user with username exists in the db or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    // if the user is verified by username
    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    // check if the user with email exists in the db or not
    const existingUserByEmail = await UserModel.findOne({ email });

    // generate a verify code
    const verifyCode = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // if the user exists with email
    if (existingUserByEmail) {
      // if the user exists with email is verified
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User is already registered with this email",
          },
          { status: 400 }
        );
      }

      // if the user exists with email is not verified
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(
        Date.now() + 60 * 60 * 1000
      );

      // save all the changes
      await existingUserByEmail.save();
    }

    // if the user does not exists with the email
    else {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // generate a verify code expiry
      const verifyCodeExpiry = new Date();
      verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

      // create a user for entry in db
      await UserModel.create({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
      });
    }

    // send the verification email to the user
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    // check if the email is successfully sent to the user or not
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 400 }
      );
    }

    // if the email is sent successfully then return the response
    return NextResponse.json(
      {
        success: true,
        message: `User is registered successfully. Please verify your account`,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    console.error("Something went wrong while registering the user");
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
