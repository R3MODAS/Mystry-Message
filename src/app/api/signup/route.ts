import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // connect to db
  connectDB();

  try {
    // get data from request body
    const { username, email, password } = await request.json();

    // check if the user with the username is verified exists in the db or not
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

    // check if the user with the email exists in the db or not
    const existingUserByEmail = await UserModel.findOne({ email });

    // generate a verify code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // if the user with the email exists
    if (existingUserByEmail) {
      // if the user with the email is verified
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User is already registered with this email",
          },
          { status: 400 }
        );
      }

      // if the user with the email is not verified
      else {
        // update the user password, verify code and expiry
        existingUserByEmail.password = password;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(
          Date.now() + 60 * 60 * 1000
        );

        // save the changes
        await existingUserByEmail.save();
      }
    }

    // if the user with the email doesn't exists
    else {
      // generate the verify code expiry
      const expiryCode = new Date();
      expiryCode.setHours(expiryCode.getHours() + 1);

      // create a new user entry for db
      const newUser = await UserModel.create({
        username,
        email,
        password,
        verifyCode,
        verifyCodeExpiry: expiryCode,
        messages: [],
      });
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    // if the email is not sent successfully
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    // if the email is sent successfully then return the response
    return NextResponse.json(
      {
        success: true,
        message: "User is registered successfully. Please verify your account",
      },
      { status: 201 }
    );
  } catch (err) {}
}
