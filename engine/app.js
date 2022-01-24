
const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 3333

// Importing classes
const User = require('./class/user');
const Patient = require('./class/patient');
const Bioimpedance = require('./class/bioimpedance');
const Anamnesis = require('./class/anamnesis');
const Exam = require('./class/exam');
const Prescription = require('./class/prescription');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
  //next;
})


app.post('/createUser', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                   req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                   req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                   req.connection.socket.remoteAddress

  try{
    let user = new User(req.body["email"], req.body["password"], req.body["role"], userAddress);
    res.send(await user.registerUser());
  }catch(e){
    res.send(e);
  }

  //next;
})

app.get('/listUsers', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try {
    let user = new User("", "", "", userAddress);
    res.send(await user.listUsers());
  }catch(e){
    res.send(e);
  }
  //next;
})

app.get('/getUserByID', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let user = new User("", "", "", userAddress);
    res.send(await user.getUserByID(req.body["user_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})


app.put('/updateUser', async (req, res) =>{
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let user = new User(req.body["email"], req.body["password"], req.body["role"], userAddress);
    res.send(await user.updateUser(req.body["user_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})


app.delete('/deleteUser', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let user = new User("", "", "", userAddress);
    res.send(await user.deleteUser(req.body["user_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})


app.post('/createPatient', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

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
  //next;
})

app.get('/listPatients', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try {
    let patient = new Patient("", "", "", "", "", "", "","", "", "", userAddress);
    res.send(await patient.listPatients());
  }catch(e){
    res.send(e);
  }
  //next;
})

app.post('/getPatientByID', async (req, res) => {
  try{
    var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress || 
                     req.connection.socket.remoteAddress

    let patient = new Patient("", "", "", "", "", "", "","", "", "", userAddress);
    res.send(await patient.getPatientByID(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})

app.put('/updatePatient', async (req, res) => {
  
  try{
    var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress || 
                     req.connection.socket.remoteAddress
     let patient = new Patient(req.body["name"], req.body["phone"],
                               req.body["birth_date"], req.body["CPF"],
                               req.body["RG"], req.body["CEP"], req.body["email"],
                               req.body["address"], req.body["occupation"], 
                               req.body["comorbidities"], userAddress);
    
      res.send(await patient.updatePatient(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})

app.delete('/deletePatient', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let patient = new Patient("", "", "", "", "", "", "","", "", "", userAddress);
    res.send(await patient.deletePatient(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})

app.post('/authenticateUser', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let user = new User(req.body["email"], req.body["password"], "", userAddress);
    res.send(await user.authUser());
  }catch(error){
    return error;
  }
  //next;
})

app.post('/createBioimpedance', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let bioimpedance = new Bioimpedance(req.body["title"], req.body["description"], 
                                        req.body["bioimpedanceText"], req.body["registerDate"], 
                                        req.body["patient_id"], userAddress);
    res.send(await bioimpedance.createBioimpedance());
  }catch(error){
    return error;
  }
  //next();
})

app.post('/listBioimpedance', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let bioimpedance = new Bioimpedance("", "", "", "", "", userAddress);
    res.send(await bioimpedance.listBioimpedance(req.body["patient_id"]));
  }catch(error){
    return error;
  }
  //next();
})

app.post('/getBioimpedanceByID', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let bioimpedance = new Bioimpedance("", "", "", "", "", userAddress);
    res.send(await bioimpedance.getBioimpedanceByID(req.body["bioimpedance_id"]));
  }catch(error){
    console.log(error)
    return error;
  }
})

app.put('/updateBioimpedance', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let bioimpedance = new Bioimpedance(req.body["title"], req.body["description"], 
                                        req.body["bioimpedanceText"], req.body["registerDate"], 
                                        req.body["patient_id"], userAddress);
    res.send(await bioimpedance.updateBioimpedance(req.body["bioimpedance_id"]));
  }catch(error){
    return error;
  }
})

app.delete('/deleteBioimpedance', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let bioimpedance = new Bioimpedance("", "", "", "", "", userAddress);
    res.send(await bioimpedance.deleteBioimpedance(req.body["bioimpedance_id"]));
  }catch(error){
    console.log(error)
    return error;
  }
})

app.post('/createAnamnesis', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let anamnesis = new Anamnesis(req.body["title"], req.body["description"], 
                                  req.body["anamnesisText"], req.body["registerDate"], 
                                  req.body["patient_id"], userAddress);
    res.send(await anamnesis.createAnamnesis());
  }catch(error){
    console.log(error)
    return error;
  }
  //next();
})

app.post('/listAnamnesis', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try {
    let anamnesis = new Anamnesis("", "", "", "", "", userAddress);
    res.send(await anamnesis.listAnamnesis(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})

app.post('/getAnamnesisByID', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let anamnesis = new Anamnesis("", "", "", "", "", userAddress);
    res.send(await anamnesis.getAnamnesisByID(req.body["anamnesis_id"]));
  }catch(error){
    return error;
  }
})

app.delete('/deleteAnamnesis', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try {
    let anamnesis = new Anamnesis("", "", "", "", "", userAddress);
    res.send(await anamnesis.deleteAnamnesis(req.body["anamnesis_id"]));
  }catch(e){
    res.send(e);
  }
  //next();
})

app.put('/updateAnamnesis', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let anamnesis = new Anamnesis(req.body["title"], req.body["description"], 
                                  req.body["anamnesisText"], req.body["registerDate"], 
                                  req.body["patient_id"], userAddress);

    res.send(await anamnesis.updateAnamnesis(req.body["anamnesis_id"]));
  }catch(error){
    return error;
  }
})

app.post('/createExam', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let exam = new Exam(req.body["examText"], req.body["examDate"], 
                              req.body["title"], req.body["type"], 
                              req.body["description"], 
                              req.body["patientId"], userAddress);
    res.send(await exam.createExam());
  }catch(error){
    console.log(error)
    return error;
  }
  //next();
})

app.post('/listExams', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try {
    let exam = new Exam("", "", "", "", "", "", userAddress);
    res.send(await exam.listExam(req.body["patient_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})

app.post('/getExamByID', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try {
    let exam = new Exam("", "", "", "", "", "", "", userAddress);
    res.send(await exam.getExamByID(req.body["exam_id"]));
  }catch(e){
    res.send(e);
  }
  //next;
})

app.put('/updateExam', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let exam = new Exam(req.body["examText"], req.body["examDate"], 
                                  req.body["title"], req.body["type"], 
                                  req.body["description"], 
                                  req.body["patientId"], userAddress);

    res.send(await exam.updateExam(req.body["exam_id"]));
  }catch(error){
    return error;
  }
})

app.post('/createPrescription', async (req, res) => {
  var userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress || 
                   req.connection.socket.remoteAddress

  try{
    let prescription = new Prescription(req.body["prescriptionText"],
                            req.body["prescriptionDate"],
                            req.body["title"], req.body["type"],
                            req.body["description"], req.body["patientId"],
                            req.body["docPath"], userAddress);

    res.send(await prescription.createPrescription());
  }catch(error){
    console.log(error)
    return error;
  }
  //next();
})





app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})