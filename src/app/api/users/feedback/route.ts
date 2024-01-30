import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel.js";

connect();

export async function POST(request: NextRequest) {
    try {
        let reqBody = await request.json();
        let { name, email, message, projectName, phone } = reqBody;

        // console.log(`project name : ${projectName}`);

        let project = projectName === undefined ? "" : projectName;
        let d = new Date();
        let feedback = new FeedbackModel({
            name,
            email,
            message,
            projectName: project,
            phone,
            date: d,
        });

        let response = await feedback.save();

        let mongoDate = response.date;
        const options = { timeZone: "Asia/Kolkata", hour12: false };

        let indianDate = mongoDate.toLocaleString("en-US", options);

        return NextResponse.json(
            {
                response,
                success: true,
                message: `message sent successfully`,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function GET() {
    try {
        let resBody = await FeedbackModel.find()
        return NextResponse.json(resBody)
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}