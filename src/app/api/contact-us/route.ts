import { connectMongoDB } from "@/lib/mongodb";
import { ContactModel } from "@/models/contact";
import { ContactUsSchema, ContactUsSchemaType } from "@/schemas/frontend";
import { AsyncHandler } from "@/utils/handlers";
import { NextResponse } from "next/server";

export const POST = AsyncHandler(async (req) => {
    // Connection to db
    await connectMongoDB();

    // Get data from request body
    const requestBodyData = (await req.json()) as ContactUsSchemaType;

    // Validation of data
    const { name, email, message } = ContactUsSchema.parse(requestBodyData);

    // Create new form data
    await ContactModel.create({
        name,
        email,
        message
    });

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Form is submitted successfully"
        },
        { status: 200 }
    );
});
