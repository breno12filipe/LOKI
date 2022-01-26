const pool = require('../db/_connection')
const pdf = require('html-pdf')
const ejs = require('ejs')
const axios = require('axios')


class Prescription{
    constructor(prescriptionText, prescriptionDate, title, type, description, patientId){
        this.prescriptionText = prescriptionText;
        this.prescriptionDate = prescriptionDate;
        this.title = title;
        this.type = type
        this.description = description;
        this.patientId = patientId;
    }

    async createPrescription(){

        // NOTE: This method must get the patient name and address from patient id
        // NOTE: This method must call the generatePrescriptionDocument method
        //       to generate the prescription document


        let Axiosresponse = await axios({
            method: 'post',
            url: 'http://localhost:3333/getPatientByID',
            responseType: 'json',
            data: {
                patient_id : this.patientId
            }
        })

        if (this.type == "medical"){
            var res = await this.generatePrescriptionDocument({
                patientName : Axiosresponse.data[0].patient_name,
                patientAddress: Axiosresponse.data[0].patient_address,
                body: this.prescriptionText
            })
            this.docPath = res
        }else if (this.type == "nutritional"){
            var res = await this.generatePrescriptionDocument({
                patientName : Axiosresponse.data[0].patient_name,
                body: this.prescriptionText
            })
            this.docPath = res
        }

        
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_prescription"
        }`;
        
        console.log(this.prescriptionDate)
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


    async generatePrescriptionDocument(data){
        // REF: https://medium.com/@hectorgrecco/gerando-pdf-a-partir-de-um-html-com-node-js-em-menos-de-5-minutos-b0a3c4b4a271

        // This method is generating unique names based on 
        // the title of the prescription and the id of the patient
        // TODO: The document path may present some incompatibility with windows, "./" investigate it.
        // TODO: O corpo do documento vem com as tags html, achar uma maneira de retirar
        if (this.type == "medical"){
            // carregando ejs na memória, renderizando como html e passando variaveis

            const html = await ejs.renderFile("./docTemplates/medicalPrescription.ejs", {patientName : data.patientName,patientAddress : data.patientAddress ,prescriptionBody : data.body}, {async: true})
            await pdf.create(html,{"directory":"./prescriptionDoc/medicalDoc"}).toFile(`./prescriptionDoc/medicalDoc/${data.patientName.trim()}/${this.title.trim()}.pdf`,(err,res) => {
                if(err){
                    console.log(err);
                }else{
                    //console.log("Medical Document created successfully!")
                }
            })

            return `./prescriptionDoc/medicalDoc/${data.patientName.trim()}/${this.title.trim()}.pdf`            
        }else if (this.type == "nutritional"){
            const html = await ejs.renderFile("./docTemplates/nutritionalPrescription.ejs", {patientName : data.patientName, prescriptionBody : data.body}, {async: true});
            await pdf.create(html,{"directory":"./prescriptionDoc/nutritionalDoc"}).toFile(`./prescriptionDoc/nutritionalDoc/${data.patientName.trim()}/${this.title.trim()}.pdf`,(err,res) => {
                if(err){
                    console.log(err);
                }else{
                    //console.log("Nutritional Document created successfully!")
                }
            })

            return `./prescriptionDoc/nutritionalDoc/${data.patientName.trim()}/${this.title.trim()}.pdf`
        }
        
    }

}


module.exports = Prescription 