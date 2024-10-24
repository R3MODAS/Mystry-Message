import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            success: true,
            message: "Api Endpoints are working properly !!!"
        },
        { status: 200 }
    );
}
