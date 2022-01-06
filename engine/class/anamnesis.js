const pool = require('../db/_connection')

class Anamnesis{
    constructor(title, description, anamnesisText, registerDate, patientId, userAddress){
        this.title = title;
        this.description = description;
        this.anamnesisText = anamnesisText;
        this.registerDate = registerDate;
        this.patientId = patientId
        this.userAddress = userAddress
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

    async listAnamnesis(patientId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM anamnesis WHERE patient_id_fk = '${patientId}'`);
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

    async deleteAnamnesis(anamnesisId){
        let response;
        try {
            response = await pool.query(`DELETE FROM anamnesis WHERE anamnesis_id=${anamnesisId};`);
            return "Anamnesis deleted successfully"
        }catch (error){
            return "Error while deleting anamnesis";
        }
    }

    async updateAnamnesis(anamnesisId){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "update_anamnesis"
        }`;

        console.log(anamnesisId)

        let updateAnamnesisQuery = `
                                    UPDATE anamnesis
                                    SET body='${this.anamnesisText}', 
                                    register_date='${this.registerDate}', 
                                    title='${this.title}', 
                                    anamnesis_description='${this.description}', 
                                    patient_id_fk=${this.patientId}, 
                                    anamnesis_log='${this.log}'
                                    WHERE anamnesis_id=${anamnesisId};
                                    `;
        let response;
        try {
            response = await pool.query(updateAnamnesisQuery);
            return {"responseText" : "Anamnesis updated successfully"};
        }catch(error){
            console.log(error)
            return {"responseText" : "Error while updating anamnesis"};
        }
        
    }

    async generateAnamnesisPDF(){

    }

}

module.exports = Anamnesis 