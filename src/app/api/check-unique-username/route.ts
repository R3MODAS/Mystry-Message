import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user";
import { UniqueUsernameSchema, UniqueUsernameSchemaType } from "@/schemas/user";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/utils/mongodb";

export const GET = AsyncHandler(async (req: NextRequest) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request query
    const { searchParams } = new URL(req.nextUrl);
    const requestQueryData = {
        username: searchParams.get("username")
    } as UniqueUsernameSchemaType;

    // Validation of data
    const { username } = UniqueUsernameSchema.parse(requestQueryData);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({ username, isVerified: true });
    if (userExists) {
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
