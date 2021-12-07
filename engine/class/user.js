class User{
    constructor(email, password, role, log){
        this.email = email;
        this.password = password;
        this.role = role;
        this.log;
    }

    registerUser(){
        // USER VALIDATIONS...


        // email validation
        let emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(this.email) == false){
            return "error";
        }

        // password validation
        /*
            (?=.*\d)              // must contain at least one digit
            (?=.*[a-z])           // must contain at least one lowercase character
            (?=.*[A-Z])           // must contain at least one uppercase character
            (?=.*[$*&@#])         // must contain at least one special character
            [0-9a-zA-Z$*&@#]{8,}  // must contain at least 8 of the mentioned characters
        */
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if (passwordRegex.test(this.password) == false){
            return "error";
        }

        let validRoles = ['root', 'admin', 'ordinary'];

        if (validRoles.indexOf(this.role) <= -1){
            return "error";
        }
        
        // Ao criar o usuário...
        let userAddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || // Recupera o IP de origem, caso a fonte esteja utilizando proxy
                           req.connection.remoteAddress || // Recupera o endereço remoto da chamada
                           req.socket.remoteAddress || // Recupera o endereço através do socket TCP
                           req.connection.socket.remoteAddress // Recupera o endereço através do socket da conexão

        this.log = {
            "creation_date": new Date(),
            "creator": userAddress,
            "operation": "create_user"
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

