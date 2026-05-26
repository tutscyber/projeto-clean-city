const service = require('../services/alertaService');

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
            mensagem: 'Alerta criado'
        });
    });
};

const atualizar = (req, res) => {

    service.atualizar(req.params.id, req.body, (erro, resultado) => {

        res.json({
            mensagem: 'Alerta atualizado'
        });
    });
};

const excluir = (req, res) => {

    service.excluir(req.params.id, (erro, resultado) => {

        res.json({
            mensagem: 'Alerta excluído'
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