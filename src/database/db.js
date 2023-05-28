import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "anderson*01072006",
    host: "localhost",
    port: 5432,
    database: "pokedex"
})

export default pool 

