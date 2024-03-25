import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
// import node from "@astrojs/node";
// import cloudflare from "@astrojs/cloudflare";

// import vercel from "@astrojs/vercel/serverless";
import deno from '@astrojs/deno';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), icon()],
  adapter: deno()
});