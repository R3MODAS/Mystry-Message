import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import connectDB from "@/lib/connectDB";
import { signUpSchema } from "@/schemas/signUpSchema";

export async function POST(request: NextRequest) {
    // connect to db
    await connectDB();

    try {
        // get data from request body
        const requestBodyData = await request.json();

        // validation of data
        const result = signUpSchema.safeParse(requestBodyData);
        if (!result.success) {
            // format the error
            const errFormat = result.error.format();

            // create an array of errors
            const errors = [
                ...(errFormat.username?._errors || []),
                ...(errFormat.email?._errors || []),
                ...(errFormat.password?._errors || []),
            ];

            // return the errors
            return NextResponse.json(
                {
                    success: false,
                    message: errors,
                },
                { status: 500 }
            );
        } else {
            // get the validated data
            const { username, email, password } = result.data;

            // check if the user verified with username exists in the db or not
            const existingUserVerifiedByUsername = await UserModel.findOne({
                username,
                isVerified: true,
            });
            if (existingUserVerifiedByUsername) {
                return NextResponse.json(
                    {
                        success: true,
                        message: "Username is already taken",
                    },
                    { status: 400 }
                );
            }

            // check if the user with email exists in the db or not
            const existingUserByEmail = await UserModel.findOne({ email });

            // generate an otp
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
                } else {
                    // hash the password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // update and save the user data
                    existingUserByEmail.password = hashedPassword;
                    existingUserByEmail.otp = otp;
                    existingUserByEmail.otpExpiry = new Date(
                        Date.now() + 10 * 60 * 1000
                    );
                    await existingUserByEmail.save();
                }
            }

            // if the user with email does not exists
            else {
                // hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // generate the otp expiry
                const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

                // create a new user
                await UserModel.create({
                    username,
                    email,
                    password: hashedPassword,
                    otp,
                    otpExpiry,
                });
            }

            // check if the mail is sent successfully to the user or not
            const emailResponse = await sendVerificationEmail(
                username,
                email,
                otp
            );
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
                { status: 200 }
            );
        }
    } catch (err) {
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
