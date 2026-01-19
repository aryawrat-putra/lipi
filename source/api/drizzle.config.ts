import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DB } from "@/constants";

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        database: DB.database!,
        host: DB.host!,
        user: DB.user!,
        password: DB.password!,
        port: DB.port!,
        ssl: {
            ca: DB.ca,
            rejectUnauthorized: true
        },
    },
});
