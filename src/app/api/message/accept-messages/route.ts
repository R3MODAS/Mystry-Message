import { connectMongoDB } from "@/lib/mongodb";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { UserModel } from "@/models/user";
import {
    AcceptMessagesSchema,
    AcceptMessagesSchemaType
} from "@/schemas/common";

// Update accept messages status
export const POST = AsyncHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Check if the user is logged in or not
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!session || !user) {
        throw new ErrorHandler("User is not logged in", 401);
    }

    // Get data from request body
    const requestBodyData = (await req.json()) as AcceptMessagesSchemaType;

    // Validation of data
    const { acceptMessages } = AcceptMessagesSchema.parse(requestBodyData);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(user._id);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Update the accept message status
    userExists.isAcceptingMessages = acceptMessages;
    await userExists.save({ validateBeforeSave: false });

    // Remove the password and __v
    userExists.password = undefined!;
    userExists.__v = undefined!;

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Updated the accept message status successfully",
            data: userExists
        },
        { status: 200 }
    );
});

// Get accept messages status
export const GET = AsyncHandler(async () => {
    // Connect to mongodb
    await connectMongoDB();

    // Check if the user is logged in or not
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(user._id);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Fetched the accept message status successfully",
            isAcceptingMessages: userExists.isAcceptingMessages
        },
        { status: 200 }
    );
});
