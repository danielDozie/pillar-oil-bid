import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { generateRandomPassword } from '@/utilities/helpers/generatePassword';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { prisma } from '@/utilities/helpers/prismaInstace';

// Generate a salt for hashing passwords
const salt = bcrypt.genSaltSync(10);

/**
 * Handles the POST request to sign up a new user.
 * 
 * @param {object} context - The request context, including request and redirect functions.
 * @returns A redirect response to the root path '/'.
 */
export const POST: APIRoute = async ({ request, redirect }) => {
    // Parse the form data from the request
    const data = await request.json();

    const companyName = data.companyName;
    const email = data.email;
    const businessPhone = data.businessPhone;
    const homePhone = data.homePhone;
    const falconRegistration = data.falconRegistration;
    
    const generatedPass = generateRandomPassword();
    // Hash the password using bcrypt
    const password = bcrypt.hashSync(generatedPass, salt);

    const token = btoa(JSON.stringify({ password, email }));

    console.log({data})

    try {
        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                email: email as string,
                password: password as string,
                // Also create a related Contractor entry
                Contractor: {
                    create: {
                        email: email as string,
                        businessPhone: businessPhone as string,
                        companyName: companyName as string,
                        homePhone: homePhone as string,
                        falconRegistration: falconRegistration as boolean
                    }
                }
            },
        });
        if (user?.id) {
            // Send mail with defined transport object
            let info = await transporter.sendMail({
                from: `"Pillar Bids" <${process.env.MAIL_USERNAME}>`, // Sender address
                to: email, // List of receivers
                subject: "Welcome to Pillar Bids/Fx", // Subject line
                text: `Welcome to Pillar Bids/Fx`, // Plain text body
                html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to Pillar Bids/Fx, ${companyName}!</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Your account has been successfully created.</p>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Please use the link below to set your password and start exploring our services:</p>
                <a href="${process.env.HOST}/auth/set-password?token=${token}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; margin: 20px 0; border-radius: 5px; text-decoration: none;">Set Your Password</a>
                <p style="color: #555; font-size: 14px;">This link will expire in 24 hours.</p>
            </div>
            `, // HTML body content
            });

            if (info.messageId) {
                return new Response(JSON.stringify({ message: "Vendor added succesfully." }), {
                    status: 200
                });
            }
        }

    } catch (error) {
        console.log(error)
        // Log the error to the console for debugging
        return new Response(JSON.stringify({message: "Add vendor failed!"}), {
            status: 404,
            statusText: 'Add vendor failed'
        });
    }

    // Redirect to path after successful signup or error
    return;
}
