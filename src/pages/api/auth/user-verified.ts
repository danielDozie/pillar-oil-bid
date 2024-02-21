import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface JwtPayload {
    email: string;
}

let email: string;


// update the user status upon email confirmation
export const POST: APIRoute = async ({cookies, redirect }) => {

    try {
        const token = cookies.get(import.meta.env.COOKIE_NAME!)?.value!;
        const decodedToken = jwt.verify(token, import.meta.env.JWT_SECRET) as JwtPayload;
        email = decodedToken.email;
    } catch (error) {
        console.error("Error decoding email:", error);
        return new Response("Error decoding email", { status: 400 });
    }

    const user = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            verified: true,
        }
    });
    if (user.verified) {
        cookies.delete("otp", {path: "/"})
        return redirect("/auth/onboarding")
    }
    return new Response(JSON.stringify(user.verified));
}

