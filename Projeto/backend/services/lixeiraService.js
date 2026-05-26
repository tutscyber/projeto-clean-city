const db = require('../config/db');

const listar = (callback) => {

    db.query(
        'SELECT * FROM lixeiras',
        callback
    );
};

const buscar = (id, callback) => {

    db.query(
        'SELECT * FROM lixeiras WHERE id = ?',
        [id],
        callback
    );
};

const criar = (dados, callback) => {

    const sql = `
    INSERT INTO lixeiras
    (localizacao,nivel,capacidade,status_lixeira)
    VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [
            dados.localizacao,
            dados.nivel,
            dados.capacidade,
            dados.status_lixeira
        ],
        callback
    );
};

const atualizar = (id, dados, callback) => {

    const sql = `
    UPDATE lixeiras
    SET
    localizacao = ?,
    nivel = ?,
    capacidade = ?,
    status_lixeira = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [
            dados.localizacao,
            dados.nivel,
            dados.capacidade,
            dados.status_lixeira,
            id
        ],
        callback
    );
};

const excluir = (id, callback) => {

    db.query(
        'DELETE FROM lixeiras WHERE id = ?',
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