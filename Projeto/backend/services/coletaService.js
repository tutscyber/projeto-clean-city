const db = require('../config/db');

const listar = (callback) => {

    db.query(
        'SELECT * FROM coletas',
        callback
    );
};

const buscar = (id, callback) => {

    db.query(
        'SELECT * FROM coletas WHERE id = ?',
        [id],
        callback
    );
};

const criar = (dados, callback) => {

    const sql = `
    INSERT INTO coletas
    (localizacao,data_coleta,status_coleta)
    VALUES(?,?,?)
    `;

    db.query(
        sql,
        [
            dados.localizacao,
            dados.data_coleta,
            dados.status_coleta
        ],
        callback
    );
};

const atualizar = (id, dados, callback) => {

    const sql = `
    UPDATE coletas
    SET
    localizacao = ?,
    data_coleta = ?,
    status_coleta = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [
            dados.localizacao,
            dados.data_coleta,
            dados.status_coleta,
            id
        ],
        callback
    );
};

const excluir = (id, callback) => {

    db.query(
        'DELETE FROM coletas WHERE id = ?',
        [id],
        callback
    );
};

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};