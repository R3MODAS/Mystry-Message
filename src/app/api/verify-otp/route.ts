import { connectMongoDB } from "@/lib/mongodb";
import { connectRedis, redisClient } from "@/lib/redis";
import { UserModel } from "@/models/user";
import { VerifyOtpSchema, VerifyOtpSchemaType } from "@/schemas/backend/auth";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { NextRequest, NextResponse } from "next/server";

export const PUT = AsyncHandler(async (req: NextRequest) => {
    // Connection to mongodb and redis
    await connectMongoDB();
    await connectRedis();

    // Get data from request query
    const { searchParams } = new URL(req.nextUrl);
    const requestQueryData = {
        userid: searchParams.get("userid"),
        otp: searchParams.get("otp")
    } as VerifyOtpSchemaType;

    // Validation of data
    const { userid, otp } = VerifyOtpSchema.parse(requestQueryData);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is already verified or not
    if (userExists.isVerified) {
        throw new ErrorHandler("User is already verified", 409);
    }

    // Validation of verify otp and otp expiry
    const verifyOtp = await redisClient.get(`verifyOtp:${userExists._id}`);
    const verifyOtpExpiry = await redisClient.get(
        `verifyOtpExpiry:${userExists._id}`
    );
    if (
        !verifyOtp ||
        !verifyOtpExpiry ||
        verifyOtp !== otp ||
        new Date() > new Date(verifyOtpExpiry)
    ) {
        throw new ErrorHandler("Invalid Otp or Otp has expired", 403);
    }

    // Verify the user and remove the verify otp and otp expiry from redis
    userExists.isVerified = true;
    await userExists.save({ validateBeforeSave: false });
    await redisClient.del(`verifyOtp:${userExists._id}`);
    await redisClient.del(`verifyOtpExpiry:${userExists._id}`);

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Otp is verified successfully"
        },
        { status: 200 }
    );
});
