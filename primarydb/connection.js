const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "durga123",
    database: "primaryDB"
})

module.exports = client
