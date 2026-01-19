import 'dotenv/config';

const DB = {
    database_url: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    max: Number(process.env.DATABASE_MAX),
    ca: process.env.DATABASE_CA,
}

const BETTER_AUTH_CLIENT_URL = process.env.BETTER_AUTH_CLIENT_URL;

export { DB, BETTER_AUTH_CLIENT_URL };