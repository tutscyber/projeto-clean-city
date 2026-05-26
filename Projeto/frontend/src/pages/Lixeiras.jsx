import { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';

import api from '../services/api';

function Lixeiras() {

    const [lixeiras, setLixeiras] = useState([]);

    const [localizacao, setLocalizacao] = useState('');

    const [cep, setCep] = useState('');

    const [nivel, setNivel] = useState('');

    const [capacidade, setCapacidade] = useState('');

    const [status, setStatus] = useState('');

    const [idEditar, setIdEditar] = useState(null);

    async function listar() {
        const resposta = await api.get('/lixeiras');

        setLixeiras(resposta.data);
    }

    async function cadastrar() {

    let statusAutomatico = '';

    if (Number(nivel) <= 40) {
        statusAutomatico = 'Ativa';
    } else if (Number(nivel) <= 79) {
        statusAutomatico = 'Média';
    } else {
        statusAutomatico = 'Cheia';
    }

    await api.post('/lixeiras', {
        localizacao,
        cep,
        nivel,
        capacidade,
        status_lixeira: statusAutomatico
    });

    alert('Lixeira cadastrada');

    limparCampos();

    listar();
}

   
    async function atualizar() {

    let statusAutomatico = '';

    if (Number(nivel) <= 40) {
        statusAutomatico = 'Ativa';
    } else if (Number(nivel) <= 79) {
        statusAutomatico = 'Média';
    } else {
        statusAutomatico = 'Cheia';
    }

    await api.put(`/lixeiras/${idEditar}`, {
        localizacao,
        cep,
        nivel,
        capacidade,
        status_lixeira: statusAutomatico
    });

    alert('Lixeira atualizada');

    limparCampos();

    listar();
}

    async function excluir(id) {

    const confirmar = window.confirm(
        'Tem certeza que deseja excluir?'
    );

    if (!confirmar) {
        return;
    }

    await api.delete(`/lixeiras/${id}`);

    alert('Lixeira excluída');

    listar();
}

    function editar(lixeira) {

        setIdEditar(lixeira.id);

        setLocalizacao(lixeira.localizacao || '');

        setCep(lixeira.cep || '');

        setNivel(lixeira.nivel || '');

        setCapacidade(lixeira.capacidade || '');

        setStatus(lixeira.status_lixeira || '');
    }

    function limparCampos() {

        setIdEditar(null);

        setLocalizacao('');

        setCep('');

        setNivel('');

        setCapacidade('');

        setStatus('');
    }

    useEffect(() => {
        listar();
    }, []);

    async function buscarCep(valorCep) {
    const cepLimpo = valorCep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert('CEP não encontrado');
            return;
        }

        setLocalizacao(dados.bairro);
        setCep(cepLimpo);

    } catch (erro) {
        alert('Erro ao buscar CEP');
    }
}
    return (

        <div className="layout">

            <Sidebar />

            <div className='conteudo'>

                <h1>Lixeiras</h1>

                <div className="formulario">

                    <input
                        placeholder='Localização'
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                    />

                    <input
                        placeholder='CEP'
                        value={cep}
                        onChange={(e) => {

                        setCep(e.target.value);

                        buscarCep(e.target.value);
                                        }}
/>

                    <input
                        placeholder='Nível'
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                    />

                    <input
                        placeholder='Capacidade'
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                    />

                    <input
                        placeholder='Status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />

                    {
                        idEditar ? (

                            <button onClick={atualizar}>
                                Atualizar
                            </button>

                        ) : (

                            <button onClick={cadastrar}>
                                Cadastrar
                            </button>
                        )
                    }

                    {
                        idEditar && (

                            <button onClick={limparCampos}>
                                Cancelar
                            </button>
                        )
                    }

                </div>

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Localização</th>
                            <th>CEP</th>
                            <th>Nível</th>
                            <th>Capacidade</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            lixeiras.map((lixeira) => (

                                <tr key={lixeira.id}>

                                    <td>{lixeira.id}</td>

                                    <td>{lixeira.localizacao}</td>

                                    <td>{lixeira.cep}</td>

                                    <td>{lixeira.nivel}%</td>

                                    <td>{lixeira.capacidade}</td>

                                    <td>{lixeira.status_lixeira}</td>

                                    <td>
                                        <button onClick={() => editar(lixeira)}>
                                            Editar
                                        </button>

                                        <button onClick={() => excluir(lixeira.id)}>
                                            Excluir
                                            
                                        </button>
                                        
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}


export default Lixeiras;