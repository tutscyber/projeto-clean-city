const mysql = require('mysql2');

const conexao = mysql.createConnection({

    host: 'pontelli.net.br',

    user: 'pontelli93b45689_aluno13db',

    password: 'RdS202613db',

    database: 'pontelli93b45689_italo13db'
});

conexao.connect((erro) => {

    if(erro) {

        console.log(erro);

    } else {

        console.log('Banco conectado');
    }
});

module.exports = conexao;