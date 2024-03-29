import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // checking if user already exist
        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exist" },
                { status: 400 }
            );
        }

        //  hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(Date.now());
        console.log(savedUser);

        // SENDING VERIFICATION EMAIL
        let mailResponse = await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });
        console.log(`this is mail response `, mailResponse);

        if (savedUser && mailResponse != undefined) {
            return NextResponse.json(
                {
                    message: "Verification email sent",
                    success: true,
                    savedUser,
                },
                { status: 201 }
            );
        }else{
            return NextResponse.json(
                {
                    message: "Signup successfull, verification mail not sent",
                    success: true,
                    savedUser,
                },
                { status: 201 }
            );
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
