import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // return the response
        return NextResponse.json(
            {
                success: true,
                message: "Api endpoints are working !!",
            },
            { status: 200 }
        );
    } catch (err) {
        const errMsg = (err as Error).message;
        console.error(errMsg);
        return NextResponse.json(
            {
                success: false,
                message: errMsg,
            },
            { status: 500 }
        );
    }
}
