//This endpoint will be a cron job to be run once a day!
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    const currentDate = new Date();

    const tenders = await prisma.tender.findMany({
        where: {
            startDate: { lt: currentDate },
            status: "pending"
        },
    });

    if (tenders.length > 0) {
        await Promise.all(
            tenders.map(async (tender) => {
                await prisma.tender.update({
                    where: { id: tender.id },
                    data: { status: "open" },
                });

                await prisma.bid.updateMany({
                    where: { tenderId: tender.id },
                    data: { status: "open" },
                });
            })
        );
        return new Response(JSON.stringify("Bid statuses updated"), { status: 200 });
    } else {
        return new Response(JSON.stringify("No bids found with start date in the past"), { status: 400 });
    }
}