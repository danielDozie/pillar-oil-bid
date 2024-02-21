import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {

    cookies.delete(process.env.COOKIE_NAME, { path: "/" });

    return redirect('/auth/login');
}