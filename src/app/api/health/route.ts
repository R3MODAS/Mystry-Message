import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // return the response
    return NextResponse.json({
      success: true,
      message: "Api endpoints working!",
    });
  } catch (err: unknown) {
    const errMsg = (err as Error).message;
    return NextResponse.json(
      {
        success: false,
        message: errMsg,
      },
      { status: 500 }
    );
  }
}
