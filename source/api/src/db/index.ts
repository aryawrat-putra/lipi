// import { Database } from './schema';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from '../constants';

const dialect = new PostgresDialect({
    pool: new Pool({
        database: DB.database,
        host: DB.host,
        user: DB.user,
        password: DB.password,
        port: DB.port,
        max: DB.max,
        ssl: {
            rejectUnauthorized: false
        },
    }),
});

// export const db = new Kysely<Database>({
export const db = new Kysely({
    dialect,
});