const db = require('../config/db');

const listarUsuarios = (callback) => {
    db.query('SELECT * FROM usuarios', callback);
};

const criarUsuario = (dados, callback) => {

    const sql = `
    INSERT INTO usuarios(nome,email,senha,tipo)
    VALUES(?,?,?,?)
    `;

    db.query(sql,
        [dados.nome, dados.email, dados.senha, dados.tipo],
        callback
    );
};

module.exports = {
    listarUsuarios,
    criarUsuario
};