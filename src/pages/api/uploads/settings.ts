import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({request}) => {
    const data = await request.json();
    const uploaded = prisma.settings.upsert({
        where: { id: 1 },
        create: {
            id: 1,
            appLogo: data?.imageUrl,
            appName: "",
            appUrl: ""
        },
        update: {
            appLogo: data?.imageUrl,
        }
    })
    
    console.log(uploaded)
    return new Response("File uploaded", {status: 200});
}


export const GET: APIRoute = async ({request}) => {
    
    return new Response("File upload endpoint", {status: 200});
}