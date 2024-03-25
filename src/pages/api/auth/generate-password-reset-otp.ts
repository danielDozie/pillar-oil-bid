import { transporter } from '@/utilities/helpers/emailTransporter';
import { prisma } from '@/utilities/helpers/prismaInstace';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.formData();
    const email = data.get('email');

    if (!email) {
        return new Response("Email is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email as string,
        },
    });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    // Generate a 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    //set the otp in cookies
    const expires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
    const cookieOptions = { httpOnly: true, expires };
    const otpCookie = `otp=${otp}; Path=/; Expires=${expires.toUTCString()}; HttpOnly`;

    cookies.set('otp', String(otp), {path: '/', httpOnly: true, maxAge: 60 * 60 * 15});
    
    // Send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Pillar Bids" <${process.env.MAIL_USERNAME}>`, // Sender address
        to: email, // List of receivers
        subject: "Password Reset OTP", // Subject line
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #333; font-size: 24px;">Password Reset OTP</h1>
            <p style="color: #555; font-size: 16px; margin: 20px 0;">Your OTP for password reset is below:</p>
            <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
            </div>
            <p style="color: #555; font-size: 14px;">This OTP is valid for 15 minutes.</p>
        </div>
        `, // HTML body with styling
    });

    if (info.messageId) {
        cookies.set('otp-type', 'pass-reset-otp', { path: '/' });
        return redirect('/auth/confirm-otp');
    }

    return redirect('/auth/forgot-password');;
}
