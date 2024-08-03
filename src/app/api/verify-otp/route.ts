import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";

export async function PUT(request: NextRequest) {
    // connection to db
    await connectDB();

    try {
        // get data from request body
        const { username, otp } = await request.json();

        // decode the username (from url)
        const decodedUsername = decodeURIComponent(username);

        // check if the user with username exists in the db or not
        let user = await UserModel.findOne({ username: decodedUsername });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User is not found",
                },
                { status: 400 }
            );
        }

        // validation of otp
        user = await UserModel.findOne({
            verifyOtp: otp,
            verifyOtpExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid token or token has expired",
            });
        }

        // verify the user and remove the otp and otp expiry and save changes
        user.isVerified = true;
        user.verifyOtp = undefined;
        user.verifyOtpExpiry = undefined;
        await user.save({ validateBeforeSave: false });

        // return the response
        return NextResponse.json(
            {
                success: true,
                message: "User is verified successfully !!",
            },
            { status: 200 }
        );
    } catch (err) {
        const errMsg = (err as Error).message;
        console.error(errMsg);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while verifying the otp",
                error: errMsg,
            },
            { status: 500 }
        );
    }
}
