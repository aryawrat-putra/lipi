import { betterAuth } from "better-auth";
import { db } from "../db";
import { BETTER_AUTH_CLIENT_URL } from "../constants";

export const auth = betterAuth({
    database: {
        db,
        type: "postgres"
    },
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