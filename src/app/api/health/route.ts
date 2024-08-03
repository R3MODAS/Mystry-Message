import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json(
            {
                success: true,
                message: "Api endpoints are working successfully 🔥🔥",
            },
            { status: 200 }
        );
    } catch (err) {
        const errMsg = (err as Error).message;
        console.error(errMsg);
        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong while checking the server health",
                error: errMsg,
            },
            { status: 500 }
        );
    }
}
