import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import sendVerificationEmail from "@/utils/sendVerificationEmail";

export async function POST(request: NextRequest) {
  // connect to db
  connectDB();

  try {
    // get data from request body
    const { username, name, email, password } = await request.json();

    // check if the verified user with username exists in the db or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
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

    // generate the verify otp
    const verifyOtp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    // if the user with the email exists
    if (existingUserByEmail) {
      // check if the user with the email is verified or not
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User is already registered",
          },
          { status: 400 }
        );
      } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the user data
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyOtp = verifyOtp;
        existingUserByEmail.verifyOtpExpiry = new Date(
          Date.now() + 15 * 60 * 10000
        );
        await existingUserByEmail.save();
      }
    }

    // if the user with the email does not exists
    else {
      // generate the verify otp expiry
      const verifyOtpExpiry = new Date(Date.now() + 15 * 60 * 10000);

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create an entry for user in db
      await UserModel.create({
        username,
        name,
        email,
        password: hashedPassword,
        verifyOtp,
        verifyOtpExpiry,
      });
    }

    // send the verification email
    const emailResponse = await sendVerificationEmail(
      username,
      email,
      verifyOtp
    );

    // check if the email is sent successfully or not
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 400 }
      );
    }

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "User is registered successfully. Please verify your account",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
