const service = require('../services/coletaService');

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

        res.json(resultado);
    });
};

const criar = (req, res) => {

    service.criar(req.body, (erro, resultado) => {

        res.json({
            mensagem: 'Coleta criada'
        });
    });
};

const atualizar = (req, res) => {

    const id = req.params.id;

    service.atualizar(id, req.body, (erro, resultado) => {

        res.json({
            mensagem: 'Coleta atualizada'
        });
    });
};

const excluir = (req, res) => {

    const id = req.params.id;

    service.excluir(id, (erro, resultado) => {

        res.json({
            mensagem: 'Coleta excluída'
        });
    });
};

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};