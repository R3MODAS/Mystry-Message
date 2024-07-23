import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

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

        // check if the user with the email exists in the db or not
        const existingUserByEmail = await UserModel.findOne({ email });

        // generate the otp
        const otp = Number(
            otpGenerator.generate(6, {
                specialChars: false,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
            })
        );

        // if the user with the email exists
        if (existingUserByEmail) {
            // check if the user with the email is verified or not
            if (existingUserByEmail.isVerified) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "User is already registered with this email",
                    },
                    { status: 400 }
                );
            }

            // if the user with the email is not verified then
            else {
                // hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // update the data
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.otp = otp;
                existingUserByEmail.otpExpiry = new Date(
                    Date.now() + 60 * 60 * 1000
                );
                await existingUserByEmail.save();
            }
        }

        // if the user with the email does not exists
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

        // send the verification email
        const emailResponse = await sendVerificationEmail(username, email, otp);

        // check if the email is sent successfully or not
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
