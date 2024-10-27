import { IMessage } from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = void> {
    success: boolean;
    message: string;
    data?: T;
    isAcceptingMessages?: boolean;
    messages?: IMessage[];
}

export interface IUser {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type HandlerFunction = (
    req: NextRequest,
    params?: any
) => Promise<NextResponse> | NextResponse;
