const pool = require('../db/_connection')

class Bioimpedance{
    constructor(title, description, anamnesisText, registerDate, patientId, userAddress){
        this.title = title;
        this.description = description;
        this.anamnesisText = anamnesisText;
        this.registerDate = registerDate;
        this.patientId = patientId
    }

    async createBioimpedance(){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_bioimpedance"
        }`;
        
        let createBioimpedanceQuery = `
            INSERT INTO bioimpedance
            (body, register_date, title, bioimpedance_description, patient_id_fk, bioimpedance_log)
            VALUES('${this.anamnesisText}', '${this.registerDate}', '${this.title}',
                   '${this.description}', ${this.patientId}, '${this.log}');
        `


        let response;
        try{
            response = await pool.query(createBioimpedanceQuery);
            return "Bioimpedance inserted successfully";
        }catch(error){
            return error;
        }
       
    }

    async listBioimpedance(){
        let response;
        try {
            response = await pool.query('SELECT * FROM bioimpedance');
            return response.rows;
        }catch (error){
            return "Error while listing bioimpedances";
        }
    }

    async getBioimpedanceByID(bioimpedanceId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM bioimpedance WHERE bioimpedance_id = ${bioimpedanceId}`);
            return response.rows;
        }catch (error){
            return "Error while returning bioimpedance";
        }
    }

    async updateBioimpedance(bioimpedanceId){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "update_bioimpedance"
        }`;

        let updateBioimpedanceQuery = `UPDATE public.bioimpedance
                                       SET body='${this.anamnesisText}', 
                                       register_date='${this.registerDate}', 
                                       title='${this.title}', bioimpedance_description='${this.description}',
                                       bioimpedance_log='${this.log}'
                                       WHERE bioimpedance_id=${bioimpedanceId};
        `;

        let response;
        try {
            response = await pool.query(updateBioimpedanceQuery);
            return {"responseText" : "Bioimpedance updated successfully"};
        }catch(error){
            return {"responseText" : "Error while updating bioimpedance"};
        }
    }

    async deletePatient(bioimpedanceId){
        let response;
        try {
            response = await pool.query(`DELETE FROM bioimpedance WHERE bioimpedance_id = ${bioimpedanceId};`);
            return "Bioimpedance deleted successfully"
        }catch (error){
            return "Error while deleting bioimpedance";
        }
    }

}

module.exports = Bioimpedance