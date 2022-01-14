const pool = require('../db/_connection')

class exam{
    constructor(title, description, examText, registerDate, examType,  patientId){
        this.title = title;
        this.description = description;
        this.examText = examText;
        this.registerDate = registerDate;
        this.examType = examType
        this.patientId = patientId
    }

    async createExam(){

    }

    async listExam(){

    }

    async generateExamPDF(){

    }

}