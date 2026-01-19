import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema"
import { BETTER_AUTH_CLIENT_URL } from "@/constants";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    baseURL: BETTER_AUTH_CLIENT_URL,
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        `${BETTER_AUTH_CLIENT_URL}`,
    ],
    socialProviders: {
        // github: {
        //     clientId: process.env.GITHUB_CLIENT_ID as string,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        // },
    },
});