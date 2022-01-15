const pool = require('../db/_connection')

class Exam{
    constructor(examText, examDate, title, type, description, patientId){
        this.examText = examText;
        this.examDate = examDate;
        this.title = title;
        this.type = type
        this.description = description;
        this.patientId = patientId;
    }

    async createExam(){
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
    }

    async listExam(patientId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.exam 
                                         WHERE patient_id_fk = '${patientId}'`);
            return response.rows;
        }catch (error){
            return "Error while listing exams";
        }
    }

    async getExamByID(examId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM public.exam WHERE exam_id = ${examId}`);
            return response.rows;
        }catch (error){
            return "Error while returning Exam";
        }
    }

    async updateExam(examId){
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
    }

    async deleteExam(examId){
        let response;
        try {
            response = await pool.query(`DELETE FROM public.exam WHERE exam_id = ${examId};`);
            return "Exam deleted successfully"
        }catch (error){
            return "Error while deleting Exams";
        }
    }


    async generateExamPDF(){

    }

}


module.exports = Exam 