import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import {
    UniqueUsernameSchema,
    UniqueUsernameSchemaType
} from "@/schemas/backend";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { NextResponse } from "next/server";

export const GET = AsyncHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request body
    const { searchParams } = new URL(req.nextUrl);
    const requestQueryData = {
        username: searchParams.get("username")
    } as UniqueUsernameSchemaType;

    // Validation of data
    const { username } = UniqueUsernameSchema.parse(requestQueryData);

    // Check if the user with the username exists in the db or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
    });
    if (existingUserVerifiedByUsername) {
        throw new ErrorHandler("Username is already taken", 409);
    }

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Username is unique"
        },
        { status: 200 }
    );
});
