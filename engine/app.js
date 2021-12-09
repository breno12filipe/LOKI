
const express = require('express')
const app = express()
const port = 3000

// Importing classes
const User = require('./class/user')
const Patient = require('./class/patient')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/createUser', (req, res) => {
  // catch email, password, role from request body

  let user = new User();
  User.registerUser();
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

