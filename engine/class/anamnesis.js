const pool = require('../db/_connection')

class Anamnesis{
    constructor(title, description, anamnesisText){
        this.title = title;
        this.description = description;
        this.anamnesisText = anamnesisText;
        this.registerDate = registerDate;
        this.patientId = patientId
    }

    async createAnamnesis(){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_anamnesis"
        }`;
        
        let createAnamnesisQuery = `
            INSERT INTO anamnesis
            (body, register_date, title, anamnesis_description, patient_id_fk, anamnesis_log)
            VALUES('${this.anamnesisText}', '${this.registerDate}', '${this.title}', 
                   '${this.description}', ${this.patientId}, '${this.log}');
        `

        let response;
        try{
            response = await pool.query(createAnamnesisQuery);
            return "Anamnesis inserted successfully";
        }catch(error){
            return error;
        }
    }

    async listAnamnesis(){
        let response;
        try {
            response = await pool.query(`SELECT * FROM anamnesis WHERE patient_id_fk = '${this.patientId}'`);
            return response.rows;
        }catch (error){
            return "Error while listing anamnesis";
        }
    }

    async getAnamnesisByID(anamnesisID){
        let response;
        try {
            response = await pool.query(`SELECT * FROM anamnesis WHERE anamnesis_id = ${anamnesisID}`);
            return response.rows;
        }catch (error){
            return "Error while returning anamnesis";
        }
    }

    async generateAnamnesisPDF(){

    }

}