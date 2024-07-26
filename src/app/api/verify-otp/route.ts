import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { verifyOtpSchema } from "@/schemas/verifyOtpSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    // connect to db
    await connectDB();

    try {
        // get data from request body
        const requestBodyData = await request.json();

        // validation of data
        const result = verifyOtpSchema.safeParse(requestBodyData);
        if (!result.success) {
            // format the error
            const errFormat = result.error.format();

            // create an array of errors
            const errors = [
                ...(errFormat.username?._errors || []),
                ...(errFormat.otp?._errors || []),
            ];

            // return the errors
            return NextResponse.json(
                {
                    success: false,
                    message: errors,
                },
                { status: 400 }
            );
        } else {
            // get the validated data
            const { username, otp } = result.data;

            // check if the user exists in the db or not
            let user = await UserModel.findOne({
                username,
            });
            if (!user) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "User is not registered",
                    },
                    { status: 400 }
                );
            }

            // validation of otp
            user = await UserModel.findOne({
                otp,
                otpExpiry: { $gt: Date.now() },
            });
            if (!user) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Invalid otp or otp has expired. Please signup to generate new otp",
                    },
                    { status: 400 }
                );
            }

            // update and save the user
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
