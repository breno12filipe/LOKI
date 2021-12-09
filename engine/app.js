
const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 3000

// Importing classes
const User = require('./class/user')
const Patient = require('./class/patient')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) 

app.get('/', (req, res) => {
  res.send('Hello World!')
})


/*
  {
    "email" : "johndoe@gmail.com",
    "password": "123456",
    "role": "root"
  }
*/
app.post('/createUser', (req, res) => {
  // let user = new User(req.body["email"], req.body["password"], req.body["role"]);
  // user.registerUser();

  let userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                     req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                     req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                     req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão

  let user = new User(req.body["email"], req.body["password"], req.body["role"], userAddress);
  res.send(user.registerUser())



  
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

