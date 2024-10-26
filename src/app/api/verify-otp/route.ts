import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/utils/mongodb";
import {
    BackendVerifyOtpSchema,
    BackendVerifyOtpSchemaType
} from "@/schemas/auth";

export const PUT = AsyncHandler(async (req: NextRequest) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request query
    const requestQueryData = {
        userid: req.nextUrl.searchParams.get("userid"),
        otp: req.nextUrl.searchParams.get("otp")
    } as BackendVerifyOtpSchemaType;

    // Validation of data
    const { userid, otp } = BackendVerifyOtpSchema.parse(requestQueryData);

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
    const user = await UserModel.findOne({
        verifyOtp: otp,
        verifyOtpExpiry: { $gt: Date.now() }
    });
    if (!user) {
        throw new ErrorHandler("Invalid Otp or otp has expired", 403);
    }

    // Verify the user and delete the verify otp and otp expiry from db
    user.isVerified = true;
    user.verifyOtp = undefined!;
    user.verifyOtpExpiry = undefined!;
    await user.save({ validateBeforeSave: false });

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Otp is verified successfully"
        },
        { status: 200 }
    );
});
