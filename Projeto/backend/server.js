const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const banco = require('./services/banco');

const app = express();
const PORTA = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando');
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    banco.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ sucesso: false });

            res.json({
                sucesso: resultado.length > 0
            });
        }
    );
});

// USUÁRIOS
app.get('/usuarios', (req, res) => {
    banco.query('SELECT * FROM usuarios', (erro, resultado) => {
        if (erro) return res.status(500).send('Erro no banco');
        res.json(resultado);
    });
});

// LIXEIRAS
app.get('/lixeiras', (req, res) => {
    banco.query('SELECT * FROM lixeiras', (erro, resultado) => {
        if (erro) return res.status(500).send('Erro');
        res.json(resultado);
    });
});

app.post('/lixeiras', async (req, res) => {
    const { localizacao, cep, nivel, capacidade, status_lixeira } = req.body;

    try {
        let latitude = null;
        let longitude = null;

        if (cep) {
            const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

           const cepLimpo = cep.replace(/\D/g, '');

const enderecoCompleto = `${endereco.data.logradouro || ''}, ${endereco.data.bairro || ''}, ${endereco.data.localidade}, ${endereco.data.uf}, Brasil`;

let geo = await axios.get(
    'https://nominatim.openstreetmap.org/search',
    {
        params: {
            q: enderecoCompleto,
            format: 'json',
            limit: 1,
            countrycodes: 'br'
        },
        headers: {
            'User-Agent': 'clean-city-projeto'
        }
    }
);

console.log('Endereço buscado:', enderecoCompleto);
console.log('Resultado geo endereço:', geo.data);

if (geo.data.length > 0) {
    latitude = geo.data[0].lat;
    longitude = geo.data[0].lon;
}// Se o CEP não for encontrado pelo mapa, usa uma coordenada aproximada
if (!latitude || !longitude) {

    if (endereco.data.localidade === 'São Paulo') {
        latitude = -23.5505;
        longitude = -46.6333;
    } else {
        latitude = -23.9608;
        longitude = -46.3336;
    }
}{
    geo = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
            params: {
                q: `${cepLimpo}, Brasil`,
                format: 'json',
                limit: 1,
                countrycodes: 'br'
            },
            headers: {
                'User-Agent': 'clean-city-projeto'
            }
        }
    );

    console.log('CEP buscado:', `${cepLimpo}, Brasil`);
    console.log('Resultado geo CEP:', geo.data);
}

if (geo.data.length > 0) {
    latitude = geo.data[0].lat;
    longitude = geo.data[0].lon;
}
        }

        banco.query(
            `INSERT INTO lixeiras
            (localizacao, cep, nivel, capacidade, status_lixeira, latitude, longitude)
            VALUES (?,?,?,?,?,?,?)`,
            [localizacao, cep, nivel, capacidade, status_lixeira, latitude, longitude],
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.status(500).send('Erro');
                }

                res.send('Lixeira cadastrada');
            }
        );

    } catch (erro) {
        console.log(erro);
        res.status(500).send('Erro ao buscar CEP');
    }
});

app.put('/lixeiras/:id', (req, res) => {
    const { id } = req.params;
    const { localizacao, cep, nivel, capacidade, status_lixeira } = req.body;

    banco.query(
        `UPDATE lixeiras SET
        localizacao = ?,
        cep = ?,
        nivel = ?,
        capacidade = ?,
        status_lixeira = ?
        WHERE id = ?`,
        [localizacao, cep, nivel, capacidade, status_lixeira, id],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Lixeira atualizada');
        }
    );
});

app.delete('/lixeiras/:id', (req, res) => {
    const { id } = req.params;

    banco.query('DELETE FROM lixeiras WHERE id = ?', [id], (erro) => {
        if (erro) return res.status(500).send('Erro');
        res.send('Lixeira excluída');
    });
});

// CAMINHÕES
app.get('/caminhoes', (req, res) => {
    banco.query('SELECT * FROM caminhoes', (erro, resultado) => {
        if (erro) return res.status(500).send('Erro');
        res.json(resultado);
    });
});

app.post('/caminhoes', (req, res) => {
    const { placa, motorista, status_caminhao } = req.body;

    banco.query(
        'INSERT INTO caminhoes (placa, motorista, status_caminhao) VALUES (?,?,?)',
        [placa, motorista, status_caminhao],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Caminhão cadastrado');
        }
    );
});

app.put('/caminhoes/:id', (req, res) => {
    const { id } = req.params;
    const { placa, motorista, status_caminhao } = req.body;

    banco.query(
        'UPDATE caminhoes SET placa = ?, motorista = ?, status_caminhao = ? WHERE id = ?',
        [placa, motorista, status_caminhao, id],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Caminhão atualizado');
        }
    );
});

app.delete('/caminhoes/:id', (req, res) => {
    const { id } = req.params;

    banco.query('DELETE FROM caminhoes WHERE id = ?', [id], (erro) => {
        if (erro) return res.status(500).send('Erro');
        res.send('Caminhão excluído');
    });
});

// COLETAS
app.get('/coletas', (req, res) => {
    banco.query('SELECT * FROM coletas', (erro, resultado) => {
        if (erro) return res.status(500).send('Erro');
        res.json(resultado);
    });
});

app.post('/coletas', (req, res) => {
    const { local_coleta, motorista, data_coleta, status_coleta } = req.body;

    banco.query(
        'INSERT INTO coletas (local_coleta, motorista, data_coleta, status_coleta) VALUES (?,?,?,?)',
        [local_coleta, motorista, data_coleta, status_coleta],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Coleta cadastrada');
        }
    );
});

app.put('/coletas/:id', (req, res) => {
    const { id } = req.params;
    const { local_coleta, motorista, data_coleta, status_coleta } = req.body;

    banco.query(
        'UPDATE coletas SET local_coleta = ?, motorista = ?, data_coleta = ?, status_coleta = ? WHERE id = ?',
        [local_coleta, motorista, data_coleta, status_coleta, id],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Coleta atualizada');
        }
    );
});

app.delete('/coletas/:id', (req, res) => {
    const { id } = req.params;

    banco.query('DELETE FROM coletas WHERE id = ?', [id], (erro) => {
        if (erro) return res.status(500).send('Erro');
        res.send('Coleta excluída');
    });
});

// ALERTAS
app.get('/alertas', (req, res) => {
    banco.query('SELECT * FROM alertas', (erro, resultado) => {
        if (erro) return res.status(500).send('Erro');
        res.json(resultado);
    });
});

app.post('/alertas', (req, res) => {
    const { mensagem, nivel } = req.body;

    banco.query(
        'INSERT INTO alertas (mensagem, nivel) VALUES (?,?)',
        [mensagem, nivel],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Alerta cadastrado');
        }
    );
});

// DASHBOARD
app.get('/dashboard', (req, res) => {
    const dados = {};

    banco.query('SELECT COUNT(*) AS total FROM lixeiras', (e1, r1) => {
        dados.lixeiras = r1[0].total;

        banco.query('SELECT COUNT(*) AS total FROM alertas', (e2, r2) => {
            dados.alertas = r2[0].total;

            banco.query('SELECT COUNT(*) AS total FROM coletas', (e3, r3) => {
                dados.coletas = r3[0].total;

                banco.query("SELECT COUNT(*) AS total FROM coletas WHERE status_coleta = 'Concluída'", (e4, r4) => {
                    dados.coletasConcluidas = r4[0].total;

                    banco.query('SELECT * FROM lixeiras WHERE nivel >= 80 ORDER BY nivel DESC LIMIT 5', (e5, r5) => {
                        dados.ultimosAlertas = r5;
                        res.json(dados);
                    });
                });
            });
        });
    });
});

// CADASTRAR USUÁRIO
app.post('/usuarios', (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    banco.query(
        'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?,?,?,?)',
        [nome, email, senha, tipo],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Usuário cadastrado');
        }
    );
});

// ATUALIZAR USUÁRIO
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;

    banco.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?',
        [nome, email, senha, tipo, id],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Usuário atualizado');
        }
    );
});

// EXCLUIR USUÁRIO
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    banco.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id],
        (erro) => {
            if (erro) return res.status(500).send('Erro');
            res.send('Usuário excluído');
        }
    );
});

// LISTAR SOMENTE MOTORISTAS
app.get('/motoristas', (req, res) => {
    banco.query(
        "SELECT * FROM usuarios WHERE tipo = 'Motorista'",
        (erro, resultado) => {
            if (erro) return res.status(500).send('Erro');
            res.json(resultado);
        }
    );
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});