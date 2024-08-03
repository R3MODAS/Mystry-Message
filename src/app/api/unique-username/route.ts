import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import * as yup from "yup";
import { usernameValidation } from "@/schemas/signUpSchema";
import UserModel from "@/models/userModel";

const usernameSchema = yup.object({
    username: usernameValidation,
});

export async function GET(request: NextRequest) {
    // connection to db
    await connectDB();

    try {
        // get the username from query params
        const queryParam = {
            username: request.nextUrl.searchParams.get("username"),
        };

        // validation of data
        const result = await usernameSchema.validate(queryParam);

        // get the username
        const { username } = result;

        // check if the verified username already exists in the db or not
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingVerifiedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 400 }
            );
        }

        // return the response
        return NextResponse.json(
            { success: true, message: "Username is available" },
            { status: 200 }
        );
    } catch (err) {
        const errMsg = (err as Error).message;
        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong while checking the unique username",
                error: errMsg,
            },
            { status: 500 }
        );
    }
}
