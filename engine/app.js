
const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 3333

// Importing classes
const User = require('./class/user')
const Patient = require('./class/patient')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) 

app.get('/', (req, res) => {
  res.send('Hello World!')
  //next();
})


/*
  {
    "email" : "johndoe@gmail.com",
    "password": "123456",
    "role": "root"
  }
*/
app.post('/createUser', async (req, res) => {
  // let user = new User(req.body["email"], req.body["password"], req.body["role"]);
  // user.registerUser();
  let userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                     req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                     req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                     req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão

  try{
    let user = new User(req.body["email"], req.body["password"], req.body["role"], userAddress);
    res.send(await user.registerUser());
  }catch(e){
    res.send(e);
  }

  //next();
})

app.get('/listUsers', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try {
    let user = new User("", "", "", userAddress);
    res.send(await user.listUsers());
  }catch(e){
    res.send(e);
  }
  //next();
})

/*
  {
    "user_id" : "1"
  }
*/
app.get('/getUserByID', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try{
    let user = new User("", "", "", userAddress);
    res.send(await user.getUserByID(req.body["user_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})


/*
  {
    "email" : "johndoe@gmail.com",
    "password": "123456",
    "role": "root",
    "user_id": 1
  }
*/
app.post('/updateUser', async (req, res) =>{
  let userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                     req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                     req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                     req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão

  try{
    let user = new User(req.body["email"], req.body["password"], req.body["role"], userAddress);
    res.send(await user.updateUser(req.body["user_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})

/*
  {
    "user_id" : "1"
  }
*/
app.post('/deleteUser', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try{
    let user = new User("", "", "", userAddress);
    res.send(await user.deleteUser(req.body["user_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})


app.post('/createPatient', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try{
    let patient = new Patient(req.body["name"], req.body["phone"],
                              req.body["birth_date"], req.body["CPF"],
                              req.body["RG"], req.body["CEP"], req.body["email"],
                              req.body["address"], req.body["occupation"], 
                              req.body["comorbidities"], userAddress);
    res.send(await patient.registerPatient());
  }catch(e){
    res.send(e);
  }
  //next();
})

app.post('/deletePatient', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try{
    let patient = new Patient("", "", "", "", "", "", "","", "", "", userAddress);
    res.send(await patient.deletePatient(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})

app.post('/getPatientByID', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try{
    let patient = new Patient("", "", "", "", "", "", "","", "", "", userAddress);
    res.send(await patient.getPatientByID(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})

app.post('/updatePatient', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try{
     let patient = new Patient(req.body["name"], req.body["phone"],
                               req.body["birth_date"], req.body["CPF"],
                               req.body["RG"], req.body["CEP"], req.body["email"],
                               req.body["address"], req.body["occupation"], 
                               req.body["comorbidities"], userAddress);
    
      res.send(await patient.updatePatient(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})

app.get('/listPatients', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try {
    let patient = new Patient("", "", "", "", "", "", "","", "", "", userAddress);
    res.send(await patient.listPatients());
  }catch(e){
    res.send(e);
  }
  //next();
})

app.post('/authenticateUser', async (req, res) => {
  const userAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try{
    let user = new User(req.body["email"], req.body["password"], "", userAddress);
    res.send(await user.authUser());
  }catch(error){
    return error;
  }
  //next();
})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

