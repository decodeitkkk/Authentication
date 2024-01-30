import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextResponse) {
    try {
        let reqBody = await request.json();
        let { password, token } = reqBody;
 
        let user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry:{$gt : Date.now()}})

        if(!user){
            return NextResponse.json({error:`Invalid token`})
        }

        let hashedPassword = await bcryptjs.hash(password,10)

        user.password = hashedPassword,
        user.forgotPasswordToken = undefined,
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message:`Password updated successfully`,user})




    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}
