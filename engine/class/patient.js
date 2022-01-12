const pool = require('../db/_connection')

class Patient{
    constructor(name, phone, birth_date, CPF, RG, CEP, email, address, occupation, comorbidities, userAddress){
        this.name = name;
        this.phone = phone;
        this.birth_date = birth_date;
        this.CPF = CPF;
        this.RG = RG;
        this.CEP = CEP;
        this.email = email;
        this.address = address;
        this.occupation = occupation;
        this.comorbidities = comorbidities;
        this.userAddress = userAddress;
    }
    
    async registerPatient(){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_patient"
        }`;

        let createPatientQuery = `INSERT INTO patient
            (patient_name, phone_number, birth_date, cpf, rg,
            cep, email, patient_address, occupation, 
            comorbidities, patient_log)
            VALUES('${this.name}', '${this.phone}', 
            '${this.birth_date}', ${this.CPF}, ${this.RG}, 
                                '${this.CEP}', '${this.email}', '${this.address}',
                                '${this.occupation}', '${this.comorbidities}', 
                                '${this.log}');`;

        let response;
        try{
            response = await pool.query(createPatientQuery);
            return "Patient inserted successfully";
        }catch(error){
            console.log(error)
            return error;
        }
       
    }

    async listPatients(){
        let response;
        try {
            response = await pool.query('SELECT * FROM patient');
            return response.rows;
        }catch (error){
            return "Error while listing patients";
        }
    }

    async getPatientByID(patientId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.patient WHERE patient_id = ${patientId};`);
            return response.rows;
        }catch (error){
            return "Error while returning patient";
        }
    }

    async updatePatient(patientId){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "update_patient"
        }`;

        let updateUserQuery = ` UPDATE patient
                            SET patient_name='${this.name}', 
                            phone_number='${this.phone}',birth_date='${this.birth_date}', 
                            cpf=${this.CPF}, rg=${this.RG}, cep='${this.CEP}', 
                            email='${this.email}',patient_address='${this.address}',
                            occupation='${this.occupation}', comorbidities='${this.comorbidities}', patient_log='${this.log}'
                            WHERE patient_id=${patientId};`;



        let response;
        try {
            response = await pool.query(updateUserQuery);
            return {"responseText" : "Patient updated successfully"};
        }catch(error){
            return {"responseText" : "Error while updating Patient"};
        }
    }

    async deletePatient(patientId){
        let response;
        try {
            response = await pool.query(`DELETE FROM patient WHERE patient_id = ${patientId};`);
            return "Patient deleted successfully"
        }catch (error){
            return "Error while deleting patient";
        }
    }
}

module.exports = Patient