const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'headmaster',
    host: 'localhost',
    database: 'loki',
    password: 'baby123baby',
    port: 5432,
})
// Exportando o cliente criado
module.exports = pool

