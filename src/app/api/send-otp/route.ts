import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import { UserModel } from "@/models/user";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/utils/mongodb";
import { EXPIRY_TIME } from "@/utils/constants";
import { sendMail } from "@/utils/sendMail";
import { SendOtpSchema, SendOtpSchemaType } from "@/schemas/auth";

export const GET = AsyncHandler(async (req: NextRequest) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request query
    const { searchParams } = new URL(req.nextUrl);

    const requestQueryData = {
        userid: searchParams.get("userid")
    } as SendOtpSchemaType;

    // Validation of data
    const { userid } = SendOtpSchema.parse(requestQueryData);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is already verified or not
    if (userExists.isVerified) {
        throw new ErrorHandler("User is already verified", 409);
    }

    // Generate the verify otp and otp expiry
    const verifyOtp = randomInt(100000, 999999).toString().padStart(6, "0");
    const verifyOtpExpiry = new Date(Date.now() + EXPIRY_TIME * 1000);

    // Send the verification email to the user
    const emailResponse = await sendMail({
        email: userExists.email,
        username: userExists.username,
        otp: verifyOtp
    });
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    }

    // Store the verify otp and otp expiry in db
    userExists.verifyOtp = verifyOtp;
    userExists.verifyOtpExpiry = verifyOtpExpiry;
    await userExists.save({ validateBeforeSave: false });

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: emailResponse.message
        },
        { status: 200 }
    );
});
