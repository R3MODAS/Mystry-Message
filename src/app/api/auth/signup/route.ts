import { AsyncHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { SignupSchema } from "@/schemas/backend";
import { UserModel } from "@/models/user";
import bcrypt from "bcrypt";

export const POST = AsyncHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request body
    const requestBodyData = await req.json();

    // Validation of data
    const { username, email, password } = SignupSchema.parse(requestBodyData);

    // Check if the user with the username is already verified or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
    });
    if (existingUserVerifiedByUsername) {
        throw new ErrorHandler("Username is already taken", 409);
    }

    // Check if the user with the email already exists in the db or not
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
        throw new ErrorHandler("User already exists, Please Login", 409);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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
