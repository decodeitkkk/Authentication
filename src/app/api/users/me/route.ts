import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(request:NextRequest){
    try {
        const userId  = await getDataFromToken(request)
        let user = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message:`User found`,
            data: user
        })
    } catch (error:any) {
        NextResponse.json({message:error.message},{status:400})
        
    }
}