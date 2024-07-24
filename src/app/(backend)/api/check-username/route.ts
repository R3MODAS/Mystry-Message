import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const usernameSchema = z.object({
    username: usernameValidation,
});

export async function GET(request: NextRequest) {
    // connect to db
    await connectDB();

    try {
        // get username from query params
        const queryParam = {
            username: request.nextUrl.searchParams.get("username"),
        };

        // validation of data
        const result = usernameSchema.safeParse(queryParam);
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return NextResponse.json(
                {
                    success: false,
                    message:
                        usernameError.length > 0
                            ? usernameError.join(", ")
                            : "Invalid query parameter",
                },
                { status: 400 }
            );
        }

        // get the username from the validated data
        const { username } = result.data;

        // check if the verified user with username exists in the db or not
        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingVerifiedUserByUsername) {
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
            {
                success: true,
                message: "Username is unique",
            },
            { status: 200 }
        );
    } catch (err: unknown) {
        const errMsg = (err as Error).message;
        console.error(errMsg);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while checking the username",
                error: errMsg,
            },
            { status: 500 }
        );
    }
}
