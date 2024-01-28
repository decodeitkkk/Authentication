import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        //--------------------------< GRAB THE EMAIL ID >----------------- 
        let reqBody = await request.json();
        const { email } = reqBody;

        //--------------------------< FINDING USER BASED ON EMAIL >--------------- 
        let user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({ message: `Invalid email id` ,status:false});
        }

        await sendEmail({email,emailType:"RESET",userId:user._id})


        return NextResponse.json({
            message:`Password reset email sent`,status:true,});
    } catch (error: any) {
        return NextResponse.json(error);
    }
}
