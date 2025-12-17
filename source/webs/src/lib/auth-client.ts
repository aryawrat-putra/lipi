import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    emailAndPassword: {
        enabled: true
    },
    baseURL: import.meta.env.VITE_BETTER_AUTH_API
})