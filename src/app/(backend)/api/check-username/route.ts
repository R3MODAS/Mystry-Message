import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";
import connectDB from "@/lib/connectDB";

const usernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: NextRequest) {
    // connect to db
    connectDB();

    try {
        // get username from query params
        const queryParam = {
            username: request.nextUrl.searchParams.get("username"),
        };

        // validation of username
        const result = usernameQuerySchema.safeParse(queryParam);
        if (!result.success) {
            // get the errors
            const usernameErrors =
                result.error.format()?.username?._errors || [];

            // return the error response
            return NextResponse.json(
                {
                    success: true,
                    message:
                        usernameErrors.length > 0
                            ? usernameErrors.join(", ")
                            : "Invalid query params",
                },
                { status: 400 }
            );
        }

        // get the data from the validation
        const { username } = result.data;

        // check if the verified username exists in the db or not
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingUserVerifiedByUsername) {
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
