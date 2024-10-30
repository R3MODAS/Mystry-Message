import { Message } from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type HandlerFunction = (
    req: NextRequest,
    params?: any
) => Promise<NextResponse> | NextResponse;

export interface ApiResponse<Data = void> {
    success: boolean;
    message: string;
    data?: Data;
    isAcceptingMessages?: boolean;
    messages?: Message[];
}

export interface IUser {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
}
