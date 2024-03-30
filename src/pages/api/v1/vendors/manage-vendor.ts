import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {
    
    const vendorId = new URL(request.url).searchParams.get('vendor')

    try {
        const vendor = await prisma.contractor.findUnique({
            where: {
                id: Number(vendorId)
            },
            include: {
                user: true
            }
        });
        if (vendor) {
            return new Response(JSON.stringify({ vendor }), {status: 200})
        }
    } catch (error) {
        return new Response(JSON.stringify({ vendor: null }), {status: 400})
    }
    
}


export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const payload = {
        companyName: data.companyName,
        email: data.email,
        homePhone: data.homePhone,
        businessPhone: data.businessPhone,
    }
    try {
        const updatedVendor = await prisma.contractor.update({
            where: {
                id: Number(data.id)
            },
            data: payload
        });
        if (updatedVendor) {
            return new Response(JSON.stringify({ message: 'Vendor updated' }), {status: 200})
        } else {
            return new Response(JSON.stringify({ message: 'Vendor update failed' }), {status: 400})
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'An error occured' }), { status: 400 })
    }
}

