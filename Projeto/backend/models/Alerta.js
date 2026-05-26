class Alerta {

    constructor(
        mensagem,
        nivel,
        data_alerta
    ) {

        this.mensagem = mensagem;
        this.nivel = nivel;
        this.data_alerta = data_alerta;
    }
}

module.exports = Alerta;