import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {

    const bidId = new URL(request.url).searchParams.get('bid');
    const id = Number(bidId);
    try {
        const bid = await prisma.bidPlacement.findUnique({
            where: {
                id: id
            },
            include: {
                tender: true,
                contractor: true,
                files: true
            }
        });
        if (bid) {
            return new Response(JSON.stringify({ bid }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ tender: null }), { status: 400 })
    }

}


export const POST: APIRoute = async ({request}) => {
    const res = await request.json();

    try {
        switch (res?.action) {
            case 'accept':
                await prisma.bidPlacement.update({
                    where: {
                        id: res?.id,
                    },
                    data: {
                        status: 'accepted'
                    }
                })
                break;
            case 'reject':
                await prisma.bidPlacement.update({
                    where: {
                        id: res?.id,
                    },
                    data: {
                        status: 'rejected'
                    }
                })
                break;
            default:
                break;
        }
        return new Response(JSON.stringify({message: `Operation Successful. ${res.action === 'accept' ? 'Accepted.' : 'Rejected.'}`}), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Operation Failed' }), { status: 400 })
    }
}