const pool = require('../db/_connection')

class User{
    constructor(email, password, role, userAddress){
        this.email = email;
        this.password = password;
        this.role = role;
        this.log;
        this.userAddress = userAddress;
    }

    registerUser(){
        // USER VALIDATIONS...

        // email validation
        let emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(this.email) == false){
            return "error";
        }

        // password validation
        // it need at least a uppercase, lowercase and numbers
        let passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@#$%]{6,20}/
        if (passwordRegex.test(this.password) == false){
            console.log("password validation gone bad")
            return "error";
        }

        let validRoles = ['root', 'admin', 'ordinary'];

        if (validRoles.indexOf(this.role) <= -1){
            console.log("role not valid!")
            return "error";
        }
        
        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_user"
        }`

        // NOTE: Antes de registrar um usuário é necessário ver se não existe um
        // com este email a fim de evitar redundancia de dados
        let createUserQuery = `SELECT FROM lokiuser WHERE email = '${this.email}';`;
        let usersReturned;
        pool.query(createUserQuery, (err, res) => {
            usersReturned = res["rowCount"];
            pool.end();
        })

        if (usersReturned <= 0){
            let createUserQuery = `INSERT INTO lokiuser (email, user_password, user_role, user_log) VALUES('${this.email}', MD5('${this.password}'), '${this.role}', '${this.log}');`;
            pool.query(createUserQuery, (err, res) => {
                console.log(err, res)
                pool.end();
                return "USER INSERT SUCCESSFULLY";
            })
        }else{
            console.log("Usuário já existe")
        }

    }

    listUsers(){
        // ...
    }

    getUserByID(){
        // ...
    }

    updateUser(){
        // ...
    }

    deleteUser(){
        // ...
    }

}

module.exports = User

