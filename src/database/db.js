import pg from "pg";
const { Pool } = pg;

const pool = new Pool(process.env.BANCO_URL)

export default pool 

