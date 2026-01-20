import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "@/lib/auth";
import { BETTER_AUTH_CLIENT_URL } from "@/constants";

const app = new Hono();
declare module 'hono' {
  interface ContextVariableMap {
    session: typeof auth.$Infer.Session
  }
}

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
  }));

app.get('/', (c) => {
  return c.text('Hello World!!');
});

import { DB } from "@/constants";

app.get('/env', (c) => {
  return c.text(JSON.stringify(DB));
});

app.on(["POST", "GET"], "/api/auth/*", (c) =>
  auth.handler(c.req.raw)
);

import { projectController } from "@/controllers/project";
import { documentController } from "@/controllers/document";
import { documentVersionController } from "@/controllers/document-version";
import { CheckAuthenticity } from "@/controllers/auth-middleware";

app.get('/api/status', (c) =>
  c.json({ status: 'ok', service: 'lipi-api' })
)

app.use('/api/*', CheckAuthenticity)
app.route('/api/document', documentController)
app.route('/api/project', projectController)
app.route('/api/document-version', documentVersionController)


import { serve } from "@hono/node-server";
import { logger } from "hono/logger";

serve({
  fetch: app.fetch,
  port: 8787
}, (info) => {
  console.log(`API live on http://localhost:${info.port}`)
})

