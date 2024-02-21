import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client'
import { decodePassword } from '@/utilities/helpers/verifyUser';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()


export const POST: APIRoute = async ({ request, redirect, cookies}) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const user = await prisma.user.findFirst({
        where: {
            email: email as string,
        },
    })

    const decodedPassword = decodePassword(password as string, user?.password);

    if (decodedPassword) {
        // Generate a token for the user
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        cookies.set(process.env.COOKIE_NAME, token, { path: "/", expires: new Date(Date.now() + 60 * 60 * 24 * 1000), httpOnly: true, maxAge: 60 * 60 * 24 });

        return redirect('/dashboard')
    }

    return redirect('/auth/login')
};
