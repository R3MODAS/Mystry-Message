import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { randomInt } from "crypto";
import { UserModel } from "@/models/user";
import { SignupSchema } from "@/schemas/auth";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/utils/mongodb";
import { EXPIRY_TIME } from "@/utils/constants";
import { sendMail } from "@/utils/sendMail";

export const POST = AsyncHandler(async (req: NextRequest) => {
    // Connect to db
    await connectMongoDB();

    // Get data from request body
    const { username, email, password } = (await req.json()) as SignupSchema;

    // Check if the user with username is already verified or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
    });
    if (existingUserVerifiedByUsername) {
        throw new ErrorHandler("Username is already taken", 409);
    }

    // Check if the user with email exists in the db or not
    const userExists = await UserModel.findOne({ email });

    // Generate the verify otp
    const verifyOtp = randomInt(100000, 999999).toString().padStart(6, "0");

    // If the user with email exists
    if (userExists) {
        // If the user with email is verified
        if (userExists.isVerified) {
            throw new ErrorHandler("User is already verified", 409);
        }

        // If the user with email is not verified
        else {
            // Hash the password
            const hashedPassword = await hash(password, 10);

            // Create new user
            await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyOtp,
                verifyOtpExpiry: new Date(Date.now() + EXPIRY_TIME * 1000)
            });
        }
    }

    // If the user with email does not exists
    else {
        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create new user
        await UserModel.create({
            username,
            email,
            password: hashedPassword,
            verifyOtp,
            verifyOtpExpiry: new Date(Date.now() + EXPIRY_TIME * 1000)
        });
    }

    // Send the verification email
    const emailResponse = await sendMail({ email, username, otp: verifyOtp });
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    }

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message:
                "User is registered successfully. Please verify your account"
        },
        { status: 201 }
    );
});
