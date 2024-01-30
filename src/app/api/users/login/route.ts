import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
 
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //  CHECK IF USER EXISTS
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: `User doesn't exist` },
                { status: 400 }
            );
        }
        console.log(`user exist`);

        // CHECK IF PASSWORD IS CORRECT
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: `Invalid Password`,message:`invalid password` },
                { status: 400 }
            );
        }
        console.log(user);

        // CREATE TOKEN DATA
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        // CREATE TOKEN
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: `Login Successfull`,
            success: true,
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: `error in backend  ${error.message}` },
            { status: 500 }
        );
    }
}
