import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "@/lib/auth";
import { BETTER_AUTH_CLIENT_URL } from "@/constants";

const app = new Hono();
declare module 'hono' {
  interface ContextVariableMap {
    session: typeof auth.$Infer.Session
  }
};

import { projectController } from "@/controllers/project";
import { documentController } from "@/controllers/document";
import { documentVersionController } from "@/controllers/document-version";
import { CheckAuthenticity } from "@/controllers/auth-middleware";

app
  .use('*', logger((info) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] : ${info}`)
  }))
  .use('*', cors({
    origin: (origin) => {
      // * Allow these origins
      const allowedOrigins = [
        BETTER_AUTH_CLIENT_URL,
        // ! later on frontend url
      ];

      return allowedOrigins.includes(origin || '') ? origin : null;
    },
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }))
  .on(["POST", "GET"], "/api/auth/*", (c) =>
    auth.handler(c.req.raw)
  )
  .get('/api/health', (c) =>
    c.json({ status: 'ok', service: 'lipi-api' })
  )
  .use('/api/*', CheckAuthenticity)
  .route('/api/project', projectController)
  .route('/api/document', documentController)
  .route('/api/document-version', documentVersionController)


import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { SERVER_PORT } from "@/constants";

serve({
  fetch: app.fetch,
  port: Number(SERVER_PORT)
}, (info) => {
  console.log(`✅ Server listening on http://localhost:${info.port}.`)
  console.log(`🔗 Visit http://localhost:${info.port}/api/health to check status.`)
})

