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

    // check if a user verified with the username exists in the db or not
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

    // generate the verify code
    const code = otpGenerator
      .generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      .toString();

    // if the user with the email exists
    if (existingUserByEmail) {
      // if the user with the email is verified
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      }
      //  if the user with the email is not verified
      else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the changes
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = code;
        existingUserByEmail.verifyCodeExpiry = new Date(
          Date.now() + 60 * 60 * 1000
        );

        // save the changes
        await existingUserByEmail.save();
      }
    } else {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // generate the verify code expiry
      const codeExpiry = new Date();
      codeExpiry.setHours(codeExpiry.getHours() + 1);

      // create an entry for user in db
      await UserModel.create({
        username,
        email,
        password: hashedPassword,
        verifyCode: code,
        verifyCodeExpiry: codeExpiry,
        messages: [],
      });
    }

    // send the verification email
    const emailResponse = await sendVerificationEmail(email, username, code);

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
        message: "User is registered successfully. Please verify your email",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    // getting the error message
    const errMsg = (err as Error).message;
    console.error("Error while registering the user", errMsg);

    // returning the error response
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
