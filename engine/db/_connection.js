const { Pool, Client } = require('pg');
const connectionString = 'postgres://ytrtczyeqlzoao:b5fb6803c7a7358ee8b576919cac5c1a65816e5772016a046df14166cad2c435@ec2-54-205-149-187.compute-1.amazonaws.com:5432/dcsn7bml07ef5l'

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
})

// Exportando o cliente criado
module.exports = pool

