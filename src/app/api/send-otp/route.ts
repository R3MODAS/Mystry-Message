import { UserModel } from "@/models/user";
import { SendOtpSchema, SendOtpSchemaType } from "@/schemas/backend/auth";
import { EXPIRY_TIME } from "@/utils/constants";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import { sendMail } from "@/utils/sendMail";
import { connectRedis, redisClient } from "@/lib/redis";
import { connectMongoDB } from "@/lib/mongodb";

export const GET = AsyncHandler(async (req: NextRequest) => {
    // Connection to mongodb and redis
    await connectMongoDB();
    await connectRedis();

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

    // Send the otp to the user via email
    const emailResponse = await sendMail({
        email: userExists.email,
        username: userExists.username,
        otp: verifyOtp
    });

    // Check if the mail is sent successfully or not
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    } else {
        // Store the verify otp and otp expiry in redis
        await redisClient.set(`verifyOtp:${userid}`, verifyOtp, {
            EX: EXPIRY_TIME
        });
        await redisClient.set(
            `verifyOtpExpiry:${userid}`,
            verifyOtpExpiry.toISOString(),
            { EX: EXPIRY_TIME }
        );

        // Return the response
        return NextResponse.json(
            {
                success: emailResponse.success,
                message: emailResponse.message
            },
            { status: 200 }
        );
    }
});
