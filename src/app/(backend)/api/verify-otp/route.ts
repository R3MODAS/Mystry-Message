import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    // connect to db
    await connectDB();

    try {
        // get data from request body
        const { username, otp } = await request.json();

        // decode the username
        const decodedUsername = decodeURIComponent(username);

        // check if the user exists in the db or not
        const user = await UserModel.findOne({ username: decodedUsername });
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
        const isValidOtp = await UserModel.findOne({
            otp,
            otpExpiry: { $gt: Date.now() },
        });
        if (!isValidOtp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid otp or otp has expired",
                },
                { status: 401 }
            );
        }

        // update the user data
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save({ validateBeforeSave: false });

        // return the response
        return NextResponse.json(
            {
                success: true,
                message: "User is verified successfully",
            },
            { status: 200 }
        );
    } catch (err: unknown) {
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
