
const client = require('./databaseConf');


var myQuery = `
    INSERT INTO public.lokiuser
    (email, user_password, user_role, user_log)
    VALUES('brenoelfwow@gmail.com', 'baby123baby', 'root', '{"teste" : "true"}');
`

client.query(myQuery, (err, res) => {
    if (err){
        console.log(err);
        return;
    }
    console.log('Usuário inserido com sucesso!');
    client.end();
});
