import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  const data = {
    id: 1,
    name: 'Bids',
  };
  return new Response(JSON.stringify(data));
};
