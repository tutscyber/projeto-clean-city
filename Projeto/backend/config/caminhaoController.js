const service = require('../services/caminhaoService');

const listar = (req, res) => {

    service.listar((erro, resultado) => {

        res.json(resultado);
    });
};

const buscar = (req, res) => {

    service.buscar(req.params.id, (erro, resultado) => {

        res.json(resultado);
    });
};

const criar = (req, res) => {

    service.criar(req.body, (erro, resultado) => {

        res.json({
            mensagem: 'Caminhão criado'
        });
    });
};

const atualizar = (req, res) => {

    service.atualizar(req.params.id, req.body, (erro, resultado) => {

        res.json({
            mensagem: 'Caminhão atualizado'
        });
    });
};

const excluir = (req, res) => {

    service.excluir(req.params.id, (erro, resultado) => {

        res.json({
            mensagem: 'Caminhão excluído'
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