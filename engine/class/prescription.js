const pool = require('../db/_connection')
const pdf = require('html-pdf')

class Exam{
    constructor(prescriptionText, prescriptionDate, title, type, description, patientId, docPath){
        this.prescriptionText = prescriptionText;
        this.prescriptionDate = prescriptionDate;
        this.title = title;
        this.type = type
        this.description = description;
        this.patientId = patientId;
        this.docPath = docPath
    }

    async createPrescription(){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_prescription"
        }`;
        
        let createPrescriptionQuery = `
            INSERT INTO public.prescription
            (body, register_date, title, prescription_description, 
             prescription_type, docpath, patient_id_fk, prescription_log)
            VALUES('${this.prescriptionText}', '${this.prescriptionDate}', 
                   '${this.title}', '${this.description}', 
                   '${this.type}', '${this.docPath}', ${this.patientId}, '${this.log}');
        `;

        let response;
        try{
            response = await pool.query(createPrescriptionQuery);
            return "Prescription inserted successfully";
        }catch(error){
            console.log(error)
            return error;
        }
    }

    async listPrescription(patientId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.prescription 
                                         WHERE patient_id_fk = '${patientId}'`);
            return response.rows;
        }catch (error){
            return "Error while listing prescriptions";
        }
    }

    async getPrescriptionByID(prescriptionId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.prescription WHERE prescription_id = ${prescriptionId}`);
            return response.rows;
        }catch (error){
            return "Error while returning Prescription";
        }
    }

    async updatePrescription(prescriptionId){
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "update_prescription"
        }`;

        let updatePrescriptionQuery = ` UPDATE public.prescription
                                SET body='${this.prescriptionText}', register_date='${this.prescriptionDate}',
                                title='${this.title}', prescription_description='${this.description}', 
                                prescription_type='${this.type}', docpath='${this.docPath}', 
                                patient_id_fk=${this.patientId}, prescription_log='${this.log}'
                                WHERE prescription_id=${prescriptionId};
                                `;
        let response;
        try {
            response = await pool.query(updatePrescriptionQuery);
            return {"responseText" : "prescription updated successfully"};
        }catch(error){
            return {"responseText" : "Error while updating prescription"};
        }
    }

    async deletePrescription(prescriptionId){
        let response;
        try {
            response = await pool.query(`DELETE FROM public.prescription WHERE prescriptionId = ${prescriptionId};`);
            return "Prescription deleted successfully"
        }catch (error){
            return "Error while deleting Prescription";
        }
    }


    async generatePrescriptionDocument(){
        // REF: https://medium.com/@hectorgrecco/gerando-pdf-a-partir-de-um-html-com-node-js-em-menos-de-5-minutos-b0a3c4b4a271

        if (this.type == "medical_prescription"){
            pdf.create(content,{}).toFile("./meuPrimeiroPdf.pdf",(err,res) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(res);
                }
            })
        }else if (this.type == "nutritional_prescription"){
            pdf.create(content,{}).toFile("./meuPrimeiroPdf.pdf",(err,res) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(res);
                }
            })

        }
    }

}


module.exports = Exam 