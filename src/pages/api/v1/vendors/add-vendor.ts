import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { generateRandomPassword } from '@/utilities/helpers/generatePassword';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { prisma } from '@/utilities/helpers/prismaInstace';
import { ADD_VENDOR_HTML, FROM_NAME } from '@/constants/notifications/email';

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
                from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
                to: email, // List of receivers
                subject: "Welcome to POL RFX", // Subject line
                text: `Welcome to POL RFX`, // Plain text body
                html: ADD_VENDOR_HTML(companyName, token)
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
