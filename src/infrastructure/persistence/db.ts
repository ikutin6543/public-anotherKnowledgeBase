import knex from 'knex';

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST,
    DB_SSL,
} = process.env;

const db = knex({
    client: 'pg',
    connection: {
        host: DB_HOST,
        // @ts-ignore
        port: DB_PORT,
        user: DB_USER,
        database: DB_NAME,
        password: DB_PASSWORD,
        ssl: DB_SSL ? {rejectUnauthorized: false} : false,
    },
});

export default db;
