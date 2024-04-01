import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.json();
    //@ts-ignore
    const email = jwt.verify(cookies.get(process.env.COOKIE_NAME)?.value, process.env.JWT_SECRET)?.email;

    try {
        if (data.companyName) {
            const payload = {
                companyName: data.companyName,
                businessPhone: data.businessPhone,
                homePhone: data.homePhone,
                email: email,
                falconRegistration: data.falconRegistration
            };

            const user = await prisma.contractor.create({
                data: {
                    ...payload,
                    user: {
                        connect: {
                            email: email,
                    },
                }}
            });

            if (user?.id) {
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

                // Send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `"POL RFX" <no-reply@pillarbid.com>`, // Sender address
                    to: email, // List of receivers
                    subject: "Welcome to POL RFX", // Subject line
                    text: `Welcome to POL RFX`, // Plain text body
                    html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL RFX</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Welcome ${payload.companyName}, your account registration is complete</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">You have successfully regstered on pillar bids platform. ,<br/>Ensure you follow all our guidlines to avoid desciplinary actions against you.<br/><br/>Feel free to reach out to us for any inquiry.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; 2024. Pillar bids.</p>
            </div>
            `, // HTML body content
                });
                if (info.messageId) {
                    return new Response(JSON.stringify({ message: "Onboarding complete!" }), { status: 200 })
                } else {
                    return new Response(JSON.stringify({
                        message: "Onboarding failed. Try again."
                    }), { status: 400 })
                }
            };
        } else if (data.firstName) {
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                businessPhone: data.businessPhone,
                email: email
            }
            const user = await prisma.fxbidder.create({
                data: {
                    ...payload,
                    user: {
                        connect: {
                            email: email,
                        },
                    }
                }
            }
            );
            if (user?.id) {
                const updateUserRole = await prisma.user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        role: 'fx-user',
                    },
                });
                if (updateUserRole.id) {
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

                    // Send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: `"POL RFX" <no-reply@pillarbid.com>`, // Sender address
                        to: email, // List of receivers
                        subject: "Welcome to POL RFX", // Subject line
                        text: `Welcome to POL RFX`, // Plain text body
                        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL RFX</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Welcome ${payload.firstName}, your account registration is complete</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">You have successfully regstered on pillar fx platform. ,<br/>Ensure you follow all our guidlines to avoid desciplinary actions against you.<br/><br/>Feel free to reach out to us for any inquiry.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; ${new Date().getFullYear()}. Pillar fx.</p>
            </div>
            `, // HTML body content
                    });
                    if (info.messageId) {
                        return new Response(JSON.stringify({ message: "Onboarding complete!" }), { status: 200 })
                    } else {
                        return new Response(JSON.stringify({
                            message: "Onboarding failed. Try again."
                        }), { status: 400 })
                    }
                }

            };
        } else {
            return;
        }

    } catch (error) {
        console.log(error)
    }

    return redirect("/auth/onboarding");
}

