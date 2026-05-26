const db = require('../config/db');

const listar = (callback) => {

    db.query(
        'SELECT * FROM alertas',
        callback
    );
};

const buscar = (id, callback) => {

    db.query(
        'SELECT * FROM alertas WHERE id = ?',
        [id],
        callback
    );
};

const criar = (dados, callback) => {

    const sql = `
    INSERT INTO alertas
    (mensagem,nivel,data_alerta)
    VALUES(?,?,?)
    `;

    db.query(
        sql,
        [
            dados.mensagem,
            dados.nivel,
            dados.data_alerta
        ],
        callback
    );
};

const atualizar = (id, dados, callback) => {

    const sql = `
    UPDATE alertas
    SET
    mensagem = ?,
    nivel = ?,
    data_alerta = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [
            dados.mensagem,
            dados.nivel,
            dados.data_alerta,
            id
        ],
        callback
    );
};

const excluir = (id, callback) => {

    db.query(
        'DELETE FROM alertas WHERE id = ?',
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