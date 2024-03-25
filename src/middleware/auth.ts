import { prisma } from "@/utilities/helpers/prismaInstace";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";

let isLoggedIn = false;

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect }, next) => {
    const token = cookies.get(import.meta.env.COOKIE_NAME)?.value;
    if (!token) {
        return next();
    };
    const secret = process.env.JWT_SECRET;

    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);

    try {
        let decoded = jwt.verify(token, secret) as JwtPayload;
        isLoggedIn = true;

        switch (decoded.role) {
            case 'fx':
                const fxUser = await prisma.fxbidder.findFirst({
                    where: {
                        email: decoded.email
                    },
                    include: {
                        user: {
                            select: {
                                role: true,
                                verified: true
                            }
                        }
                    }
                });

                //@ts-ignore
                locals.user = fxUser;
                //@ts-ignore
                locals.isLoggedIn = isLoggedIn;
                break;

            default:
                const user = await prisma.contractor.findFirst({
                    where: {
                        email: decoded.email
                    },
                    include: {
                        user: {
                            select: {
                                role: true,
                                verified: true
                            }
                        }
                    }
                });

                //@ts-ignore
                locals.user = user;
                //@ts-ignore
                locals.isLoggedIn = isLoggedIn;
                break;
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        // Optionally, you can decide to send back a response here if JWT verification is critical
        return redirect('/forbidden', 301);
    }
    return next();
});