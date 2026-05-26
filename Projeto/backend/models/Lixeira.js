class Lixeira {

    constructor(
        localizacao,
        nivel,
        capacidade,
        status_lixeira
    ) {

        this.localizacao = localizacao;
        this.nivel = nivel;
        this.capacidade = capacidade;
        this.status_lixeira = status_lixeira;
    }
}

module.exports = Lixeira;