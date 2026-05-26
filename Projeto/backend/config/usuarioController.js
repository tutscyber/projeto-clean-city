const service = require('../services/usuarioService');

const listar = (req, res) => {

    service.listarUsuarios((erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json(resultado);
        }
    });
};

const criar = (req, res) => {

    service.criarUsuario(req.body, (erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
        } else {
            res.json({
                mensagem: 'Usuário criado'
            });
        }
    });
};

module.exports = {
    listar,
    criar
};