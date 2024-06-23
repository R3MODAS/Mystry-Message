import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // connect to database
  connectDB();

  try {
    // get data from request body
    const { username, email, password } = await request.json();

    // check if the user is verified by username exists in the db or not
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

    // generate the verifyCode
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // if the existing user with email is verified
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User is already registered with this email",
          },
          { status: 400 }
        );
      }

      // if the existing user with email is not verified
      else {
        existingUserByEmail.password = password;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(
          Date.now() + 60 * 60 * 1000
        );
        await existingUserByEmail.save();
      }
    } else {
      // generate the verify code expiry
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // create a new entry for user in db
      const newUser = await UserModel.create({
        username,
        email,
        password,
        verifyCode,
        verifyCodeExpiry: expiryDate,
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

    // return the response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error while registering the user", err);
    return Response.json(
      {
        success: false,
        message: "Error while registering the user",
      },
      { status: 500 }
    );
  }
}
