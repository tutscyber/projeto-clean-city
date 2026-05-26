const service = require('../services/lixeiraService');

const listar = (req, res) => {

    service.listar((erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json(resultado);
        }
    });
};

const buscar = (req, res) => {

    const id = req.params.id;

    service.buscar(id, (erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json(resultado);
        }
    });
};

const criar = (req, res) => {

    service.criar(req.body, (erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json({
                mensagem: 'Lixeira criada'
            });
        }
    });
};

const atualizar = (req, res) => {

    const id = req.params.id;

    service.atualizar(id, req.body, (erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json({
                mensagem: 'Lixeira atualizada'
            });
        }
    });
};

const excluir = (req, res) => {

    const id = req.params.id;

    service.excluir(id, (erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json({
                mensagem: 'Lixeira excluída'
            });
        }
    });
};

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};