import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    try {
        const data = await prisma.fxBid.findMany({
            include: {
                fx: true,
                FxBidPlacement: true,
            }
        });

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("An error occured"), { status: 400 });
    }
}