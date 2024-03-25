import fs from "node:fs"
import type { APIRoute } from "astro";

export const POST: APIRoute = async (context) => {
    const req = await context.request.formData();
    const file = req.get('file');
    if (file instanceof Blob) { 
        // Convert file to stream
        const stream = file.stream();

        // Convert stream to buffer
        const buffer = await new Response(stream).arrayBuffer();
        // Make a new FormData
        const uploadData = new FormData();
        const blobFile = new Blob([buffer], { type: file.type });
        uploadData.append("file", blobFile, file.name);
        try {
        const rootPublicFolder = 'public/tender-documents/';
        const fileName = `${file.name}`;
        const filePath = `${rootPublicFolder}${fileName}`;
            fs.writeFileSync(filePath, Buffer.from(buffer));
            return new Response("File uploaded successfully")
        } catch (error) {
            return new Response("File upload failed!")
        }
    }

    return new Response("An error occured.")
}



export const DELETE: APIRoute = async (context) => {
    const req = await context.request.formData();
    const fileName = req.get('fileName');
    const rootPublicFolder = 'public/tender-documents/';
    const filePath = `${rootPublicFolder}${fileName}`;
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return new Response("File removed successfully");
        } else {
            return new Response("File does not exist", { status: 404 });
        }
    } catch (error) {
        return new Response("Failed to remove file", { status: 500 });
    }
}