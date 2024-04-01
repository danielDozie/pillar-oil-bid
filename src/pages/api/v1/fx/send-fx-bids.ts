import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request }) => {

    const {fx: result} = await request.json();

    try {
        const response = await prisma.fxBid.createMany({
            data: Array.isArray(result?.FxRecipients) ? result?.FxRecipients?.map(item => ({
                status: result?.status,
                amount: result?.amount,
                fxId: result?.id,
                bidderId: item?.fxBidder?.id || null,
            })) : [{
                status: result?.status,
                amount: result?.amount,
                fxId: result?.id,
                bidderId: result?.FxRecipients?.fxBidder?.id || null
            }],
            skipDuplicates: true,
        });
        if (response) {
        const fxUpdated = await prisma.fx.update({
            where: { id: result?.id },
            data: { status: "sent" }
        });

        if (fxUpdated?.status === "sent") {
            return new Response(JSON.stringify({ message: "Fx sent successfully!" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Failed to update Fx status!" }), { status: 400 });
        }
        }

        //const tenderId = Array.isArray(result.tender) ? result.tender[0].id : result.tender.id;

        // if (response?.count > 0) {
        //     // Update the tender status to "sent"
        //     const tenderUpdated = await prisma.tender.update({
        //         where: { id: tenderId },
        //         data: { status: "sent" }
        //     });

        //     if (tenderUpdated?.status === "sent") {
        //         console.log({ tenderUpdated })
        //         return new Response(JSON.stringify({ message: "Tender sent succefully!" }), { status: 200 })
        //     };
        // }
        // else {
        //     return new Response(JSON.stringify({ message: "Tender sending failed!" }), { status: 400 })
        // }
    } catch (error) {
        console.log({ error })
        return new Response(JSON.stringify({ message: "Oops! An error occured!" }), { status: 400 })
    }

    return new Response('Wakanda!')
}