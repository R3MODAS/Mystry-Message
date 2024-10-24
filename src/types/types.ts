import { IMessage } from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: IMessage[];
}

export type HandlerFunction = (
    req: NextRequest,
    params?: any
) => Promise<NextResponse> | NextResponse;
