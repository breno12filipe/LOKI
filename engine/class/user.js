const pool = require('../db/_connection')

class User{
    constructor(email, password, role, userAddress){
        this.email = email;
        this.password = password;
        this.role = role;
        this.log;
        this.userAddress = userAddress;
    }

    async registerUser(){
        // USER VALIDATIONS...

        // Password validation
        if (this.password.length < 8){
            return "Password must contain at least 8 characters";
        }

        var validSpecialChar = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
        if (validSpecialChar.test(this.password) == false) {
            return "Password must contain special characters";
        }
        
        if (this.password.toLowerCase() == this.password){
            return "Password must contain at least one Uppercase character";
        }
            
        // Role validations
        let validRoles = ['root', 'admin', 'ordinary'];

        if (validRoles.indexOf(this.role) <= -1){
            return "Role not valid!";
        }

        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_user"
        }`   

        // // NOTE: Antes de registrar um usuário é necessário ver se não existe um
        // // com este email a fim de evitar redundancia de dados
        let createUserQuery = `INSERT INTO lokiuser 
                               (email, user_password, user_role, user_log) 
                               VALUES('${this.email}', 
                               MD5('${this.password}'), 
                               '${this.role}', 
                               '${this.log}') 
                               ON CONFLICT DO NOTHING;`;

        let response;
        try{
            response = await pool.query(createUserQuery)
            return "User inserted successfully";
        }catch(error){
            return "Error while inserting user";
        }
    }


    async listUsers(){
        let response;
        try {
            response = await pool.query('SELECT * FROM lokiuser');
            return response.rows;
        }catch (error){
            return "Error while listing users";
        }
    }


    async getUserByID(userId){
        let response;
        try {
            response = await pool.query(`SELECT * FROM lokiuser WHERE user_id = ${userId}`);
            return response.rows;
        }catch (error){
            return "Error while returning user";
        }
    }

    async updateUser(userId){
        if (this.password.length < 8){
            return "Password must contain at least 8 characters";
        }

        var validSpecialChar = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
        if (validSpecialChar.test(this.password) == false) {
            return "Password must contain special characters";
        }
        
        if (this.password.toLowerCase() == this.password){
            return "Password must contain at least one Uppercase character";
        }
            
        // Role validations
        let validRoles = ['root', 'admin', 'ordinary'];

        if (validRoles.indexOf(this.role) <= -1){
            return "Role not valid!";
        }

        this.log = `{
            "creation_date": "${new Date().toDateString()}",
            "creator": "${this.userAddress}",
            "operation": "create_user"
        }`   

        createUserQuery = ` UPDATE lokiuser
                            SET email='${this.email}',
                                user_password='${this.password}',
                                user_role='${this.role}',
                                user_log='${this.log}'
                            WHERE user_id = ${userId}
                        `
        
        try{
            await pool.query(createUserQuery);
            return "User updated successfully";
        }catch(error){
            return "Error while updating user";
        }

    }

    async deleteUser(userId){
        let response;
        try {
            response = await pool.query(`DELETE FROM lokiuser WHERE user_id = ${userId};`);
            return "User deleted successfully"
        }catch (error){
            return "Error while deleting user";
        }
    }

}

module.exports = User 