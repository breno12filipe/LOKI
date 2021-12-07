const { Client } = require('pg');

const client = new Client({
    user:'headmaster',
    host:'localhost',
    database:'loki',
    password: 'baby123baby',
    port: 5432
});

module.exports = client;