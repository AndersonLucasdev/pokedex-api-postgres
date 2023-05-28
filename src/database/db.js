const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "anderson*01072006",
    host: "localhost",
    port: 5432,
    database: "pokedex"
})

module.exports = pool
