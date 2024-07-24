import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();

    const session = await getServerSession(authOptions);
    console.log(session);

    return NextResponse.json(
        {
            success: true,
            message: "Ok",
        },
        { status: 200 }
    );
}
