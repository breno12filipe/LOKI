const pool = require('./_connection')

pool.query('SELECT * FROM lokiuser', (err, res) => {
  console.log(err, res)
  pool.end()
})