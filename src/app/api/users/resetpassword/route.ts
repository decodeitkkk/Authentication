import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest) {
    try {
        let reqBody = await request.json();
        let { password, token } = reqBody;
 
        let user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry:{$gt : Date.now()}})

        if(!user){
            return NextResponse.json({message:`Invalid token or token expired`,success:false})
        }

        let hashedPassword = await bcryptjs.hash(password,10)

        user.password = hashedPassword,
        user.forgotPasswordToken = undefined,
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message:`Password updated successfully`,success:true,user})




    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
