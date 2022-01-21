const pool = require('../db/_connection')
const pdf = require('html-pdf')

class Exam{
    constructor(prescriptionText, prescriptionDate, title, type, description, patientId){
        this.prescriptionText = prescriptionText;
        this.prescriptionDate = prescriptionDate;
        this.title = title;
        this.type = type
        this.description = description;
        this.patientId = patientId;
    }

    async createPrescription(){
        //                      EXAMS CODE
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_exam"
        }`;
        
        let createExamQuery = `
            INSERT INTO public.exam
            (body, exam_date, title, exam_type, exam_description, exam_log, patient_id_fk)
            VALUES('${this.examText}', '${this.examDate}', '${this.title}', 
                   '${this.type}', '${this.description}', '${this.log}',
                    ${this.patientId});
        `;

        let response;
        try{
            response = await pool.query(createExamQuery);
            return "Exam inserted successfully";
        }catch(error){
            console.log(error)
            return error;
        }
        //                      EXAMS CODE
    }

    async listPrescription(patientId){
        //                      EXAMS CODE
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.exam 
                                         WHERE patient_id_fk = '${patientId}'`);
            return response.rows;
        }catch (error){
            return "Error while listing exams";
        }
        //                      EXAMS CODE
    }

    async getPrescriptionByID(examId){
        //                      EXAMS CODE
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.exam WHERE exam_id = ${examId}`);
            return response.rows;
        }catch (error){
            return "Error while returning Exam";
        }
        //                      EXAMS CODE
    }

    async updatePrescription(examId){
        //                      EXAMS CODE
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "update_exam"
        }`;

        let updateExamQuery = ` UPDATE public.exam
                                        SET body='${this.examText}', 
                                        exam_date='${this.examDate}', 
                                        title='${this.title}', 
                                        exam_type='${this.type}', 
                                        exam_description='${this.description}', 
                                        exam_log='${this.log}', 
                                        patient_id_fk=${this.patientId}
                                        WHERE exam_id=${examId};
                                    `;

        let response;
        try {
            response = await pool.query(updateExamQuery);
            return {"responseText" : "exam updated successfully"};
        }catch(error){
            return {"responseText" : "Error while updating exam"};
        }
        //                      EXAMS CODE
    }

    async deletePrescription(examId){
        //                      EXAMS CODE
        let response;
        try {
            response = await pool.query(`DELETE FROM public.exam WHERE exam_id = ${examId};`);
            return "Exam deleted successfully"
        }catch (error){
            return "Error while deleting Exams";
        }
        //                      EXAMS CODE
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