import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";
import connectDB from "@/lib/connectDB";

// username query schema
const usernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: NextRequest) {
    // connect to db
    connectDB();

    try {
        // get the username from query params
        const queryParam = {
            username: request.nextUrl.searchParams.get("username"),
        };

        // validation of data
        const result = usernameQuerySchema.safeParse(queryParam);
        console.log(result);
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
