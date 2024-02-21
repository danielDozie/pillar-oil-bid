import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

export const POST:APIRoute  = async ({request, cookies, redirect}) => {
    const data = await request.formData();
    const contractor_email = jwt.verify(cookies.get(process.env.COOKIE_NAME)?.value, process.env.JWT_SECRET)?.email;

    const payload = {
        firstName: data.get("firstname") as string,
        lastName: data.get("lastname") as string,
        contactInfo: data.get("phone") as string
    }

    try {
        const user = await prisma.contractor.update({
            where: {
                email: contractor_email,
            },
            data: payload
        });

        if (user?.id) {
            // Create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.MAIL_USERNAME, // generated ethereal user
                    pass: process.env.MAIL_PASSWORD, // generated ethereal password
                },
            });


            // Send mail with defined transport object
            let info = await transporter.sendMail({
                from: `"Pillar Bids" <no-reply@pillarbid.com>`, // Sender address
                to: contractor_email, // List of receivers
                subject: "Welcome to Pillar Bids", // Subject line
                text: `Welcome to Pillar Bids`, // Plain text body
                html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to Pillar Bids</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Welcome ${payload.firstName}, your account registration is complete</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">You have successfully regstered on pillar bids platform. ,<br/>Ensure you follow all our guidlines to avoid desciplinary actions against you.<br/><br/>Feel free to reach out to us for any inquiry.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; 2024. Pillar bids.</p>
            </div>
            `, // HTML body content
            });
            if (info.messageId) {
                return redirect("/auth/congratulations");
            }
        }
    } catch (error) {
        console.log(error)
    }

    return redirect("/auth/onboarding");
}

