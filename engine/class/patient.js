class Patient{
    constructor(name, phone, birth_date, CPF, RG, CEP, email, address, occupation, comorbidities){
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
        this.log = {"creation_date": new Date()}
    }

    registerPatient(){
        // ...
    }

    listPatients(){
        // ...
    }

    getPatientByID(){
        // ...
    }

    updatePatient(){
        // ...
    }

    deletePatient(){
        // ...
    }
}

module.exports = Patient