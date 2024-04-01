import { prisma } from "@/utilities/helpers/prismaInstace";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect }, next) => {
    const token = cookies.get(import.meta.env.COOKIE_NAME)?.value;
    if (!token) {
        return next();
    };
    const secret = process.env.JWT_SECRET;

    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;

        const userQueryOptions = {
            where: { email: decoded.email },
            include: { user: { select: { role: true, verified: true } } }
        };

        let user;
        switch (decoded.role) {
            case 'fx':
                user = await prisma.fxbidder.findFirst(userQueryOptions);
                break;
            case 'fx-user':
                user = await prisma.fxbidder.findFirst(userQueryOptions);
                break;
            default:
                user = await prisma.contractor.findFirst(userQueryOptions);
                break;
        }

        if (user) {
            locals.user = user as User;
            locals.isLoggedIn = true;
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        return redirect('/forbidden', 301);
    }
    return next();
});