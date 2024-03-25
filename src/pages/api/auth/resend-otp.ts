import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

interface JwtPayload {
    email: string;
}

let email: string;

//resend otp
export const GET: APIRoute = async ({ cookies, request }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    try {
        const token = cookies.get(import.meta.env.COOKIE_NAME!)?.value!;
        const decodedToken = jwt.verify(token, import.meta.env.JWT_SECRET) as JwtPayload;
        email = decodedToken.email;
    } catch (error) {
        console.error("Error decoding email:", error);
        return new Response("Error decoding email", { status: 400 });
    }
    // Perform OTP verification before redirecting
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4 digit OTP

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });


    // // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Pillar Bids" <no-reply@pillarbid.com>`, // Sender address
        to: email, // List of receivers
        subject: "Verify your account", // Subject line
        text: `Your OTP is ${otp}`, // Plain text body
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Confirm your OTP</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Verify your account with the one-time password (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `, // HTML body content
    });
    if (info?.messageId) {
        // Save OTP in cookies with a TTL of 15 minutes
        cookies.set('otp', JSON.stringify(otp), { path: "/", maxAge: 60 * 15, httpOnly: true });
        
        return new Response(JSON.stringify({message: true}));
    }

    return new Response(JSON.stringify({ message: false }));
};