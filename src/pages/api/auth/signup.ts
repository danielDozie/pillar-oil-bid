import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Generate a salt for hashing passwords
const salt = bcrypt.genSaltSync(10);

// Initialize Prisma Client to interact with the database
const prisma = new PrismaClient();

/**
 * Handles the POST request to sign up a new user.
 * 
 * @param {object} context - The request context, including request and redirect functions.
 * @returns A redirect response to the root path '/'.
 */
export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    // Parse the form data from the request
    const data = await request.formData();
    const email = data.get('email');
    // Hash the password using bcrypt
    const password = bcrypt.hashSync(data.get('password'), salt);

    try {
        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                email: email as string,
                password: password as string,
                // Also create a related Contractor entry
                Contractor: {
                    create: {
                        email: email as string
                    }
                }
            },
        });

        // // Generate a token for the new user
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        cookies.set(process.env.COOKIE_NAME, token, { path: "/", expires: new Date(Date.now() + 60 * 60 * 24 * 1000), httpOnly: true, maxAge: 60 * 60 * 24 });

        //do OTP verification before redirect!!!
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4 digit OTP

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

        // Save OTP in cookies with a TTL of 15 minutes
        cookies.set('otp', JSON.stringify(otp), { path: "/", maxAge: 60 * 15, httpOnly: true });
        if (info?.messageId) {
            return redirect('/auth/confirm-otp');
        }

    } catch (error) {
        // Log the error to the console for debugging
        console.error("Signup error:", error);
    }

    // Redirect to the root path after successful signup or error
    return redirect('/');
};
