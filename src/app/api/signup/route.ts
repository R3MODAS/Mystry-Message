import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/models/user";
import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/utils/mongodb";
import { hash } from "bcrypt";
import { BackendSignupSchema, BackendSignupType } from "@/schemas/signup";

export const POST = AsyncHandler(async (req: NextRequest) => {
    // Connect to db
    await connectMongoDB();

    // Get data from request body
    const requestBodyData = (await req.json()) as BackendSignupType;

    // Validation of data
    const { username, email, password } =
        await BackendSignupSchema.parseAsync(requestBodyData);

    // Check if the user with username is verified or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
    });
    if (existingUserVerifiedByUsername) {
        throw new ErrorHandler("Username is already taken", 409);
    }

    // Check if the user with email already exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        throw new ErrorHandler("User already exists, Please Login", 409);
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const signupData = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    // Remove the password and __v
    signupData.password = undefined!;
    signupData.__v = undefined!;

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "User is registered successfully",
            data: signupData
        },
        { status: 201 }
    );
});
