import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

export async function POST(request: NextRequest) {
    // connection to db
    await connectDB();

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

        // generate a verify otp
        const otp = Number(
            otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                specialChars: false,
                upperCaseAlphabets: false,
            })
        );

        // if the user with email exists
        if (existingUserByEmail) {
            // if the user with email is verified
            if (existingUserByEmail.isVerified) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "User is already registered",
                    },
                    { status: 400 }
                );
            }

            // if the user with email is not verified
            else {
                // hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // update and save the user
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyOtp = otp;
                existingUserByEmail.verifyOtpExpiry = new Date(
                    Date.now() + 15 * 60 * 1000
                );
                await existingUserByEmail.save();
            }
        }

        // if user with email doesn't exists
        else {
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create new user
            await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyOtp: otp,
                verifyOtpExpiry: new Date(Date.now() + 15 * 60 * 1000),
            });
        }

        // check if the verification email is sent successfully or not
        const emailResponse = await sendVerificationEmail(username, email, otp);
        if (!emailResponse.success) {
            return NextResponse.json(
                {
                    success: emailResponse.success,
                    message: emailResponse.message,
                },
                { status: 400 }
            );
        }

        // return the response
        return NextResponse.json(
            {
                success: true,
                message:
                    "User is registered successfully. Please verify your account",
            },
            { status: 201 }
        );
    } catch (err) {
        const errMsg = (err as Error).message;
        console.error(errMsg);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while registering the user",
                error: errMsg,
            },
            { status: 500 }
        );
    }
}
