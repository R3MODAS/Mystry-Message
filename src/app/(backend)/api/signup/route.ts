import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";

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

        // generate the otp
        const otp = Number(
            otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                specialChars: false,
                upperCaseAlphabets: false,
            })
        );

        // if the user with email exists
        if (existingUserByEmail) {
            // check if the user with email is verified or not
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

                // update the user data and save the changes
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.otp = otp;
                existingUserByEmail.otpExpiry = new Date(
                    Date.now() + 60 * 60 * 1000
                );
                await existingUserByEmail.save();
            }
        }

        // if the user with email does not exists
        else {
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // generate the otp expiry
            const otpExpiry = new Date();
            otpExpiry.setHours(otpExpiry.getHours() + 1);

            // create an entry for user in db
            await UserModel.create({
                username,
                name,
                email,
                password: hashedPassword,
                otp,
                otpExpiry,
            });
        }

        // check if the verification email is sent successfully or not
        const emailResponse = await sendVerificationEmail(username, email, otp);
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
                message:
                    "User is registered successfully. Please verify your account",
            },
            { status: 201 }
        );
    } catch (err: unknown) {
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
