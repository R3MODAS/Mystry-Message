import { NextRequest, NextResponse } from "next/server";
import { HandlerFunction } from "@/types/types";
import { ZodError } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */

class ErrorHandler extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}

const AsyncHandler =
    (fn: HandlerFunction) => async (req: NextRequest, params?: any) => {
        try {
            return await fn(req, params);
        } catch (err: any) {
            return handleError(err);
        }
    };

const handleError = (err: any) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error Occurred";

    // MongoDB invalid id
    if (err.name === "CastError") {
        message = "Invalid ID";
        statusCode = 500;
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        statusCode = 400;
    }

    // Zod validation error
    if (err instanceof ZodError) {
        statusCode = 400;
        const errorMessages = err.errors.map((error) => ({
            field: error.path.join("."),
            message: error.message
        }));

        if (errorMessages.length > 1) {
            return NextResponse.json(
                {
                    success: false,
                    errors: errorMessages
                },
                { status: 400 }
            );
        } else {
            message = errorMessages[0].message;
        }
    }

    // Return the response
    return NextResponse.json(
        {
            success: false,
            message
        },
        { status: statusCode }
    );
};

export { ErrorHandler, AsyncHandler };
