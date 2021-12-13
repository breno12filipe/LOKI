const pool = require('../db/_connection')

class Anamnesis{
    constructor(title, description, anamnesisText){
        this.title = title;
        this.description = description;
        this.anamnesisText = anamnesisText;
    }

    async createAnamnesis(){

    }

    async listAnamnesis(){

    }

    async generateAnamnesisPDF(){

    }

}