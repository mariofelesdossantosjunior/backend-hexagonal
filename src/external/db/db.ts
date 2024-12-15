import pgPromise from "pg-promise"

const db = pgPromise()({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
})


export default db