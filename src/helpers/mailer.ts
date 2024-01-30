import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //  TO GET INDIAN DATE & TIME
        let d = Date.now();
        let options = {
            timeZone: "Asia/Kolkata",
            hour12: false,
        };

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        let transport = nodemailer.createTransport({
            service: process.env.SERVICE,
            // host: "sandbox.smtp.mailtrap.io",
            // port: 2525,
            // service:"gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "kailashdaphnis@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password",
            // html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}. or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>` ,
            html: `<p>Click 
            <a href=" ${
                emailType === "VERIFY"
                    ? process.env.DOMAIN + "/verifyemail?token=" + hashedToken
                    : process.env.DOMAIN + "/resetpassword?token=" + hashedToken
            } ">Here</a> to ${
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password"
            }. or copy and paste the link below in your browser. <br> ${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken} </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
