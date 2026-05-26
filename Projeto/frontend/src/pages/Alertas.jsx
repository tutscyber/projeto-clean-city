import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

function Alertas() {
    const [lixeiras, setLixeiras] = useState([]);
    const [aba, setAba] = useState('ativos');

    async function carregar() {
        const resposta = await api.get('/lixeiras');
        setLixeiras(resposta.data);
    }

    async function resolver(item) {

    await api.put(`/lixeiras/${item.id}`, {

        localizacao: item.localizacao,

        cep: item.cep,

        nivel: item.nivel,

        capacidade: item.capacidade,

        status_lixeira: 'Coletada'
    });

    carregar();

    setAba('resolvidos');
}

    useEffect(() => {
        carregar();
    }, []);

    const todos = lixeiras.filter(item => Number(item.nivel) >= 70);
    const ativos = lixeiras.filter(item =>
    Number(item.nivel) >= 80 &&
    item.status_lixeira !== 'Coletada'
);
    const resolvidos = lixeiras.filter(item => item.status_lixeira === 'Coletada');

    let lista = ativos;

    if (aba === 'todos') lista = todos;
    if (aba === 'ativos') lista = ativos;
    if (aba === 'resolvidos') lista = resolvidos;

    return (
        <div className="layout">
            <Sidebar />

            <div className="conteudo">
                <div className="topo-alertas">
                    <h1>Alertas</h1>

                    <div className="abas-alertas">
                        <button
                            className={aba === 'todos' ? 'aba ativa' : 'aba'}
                            onClick={() => setAba('todos')}
                        >
                            Todos
                        </button>

                        <button
                            className={aba === 'ativos' ? 'aba ativa' : 'aba'}
                            onClick={() => setAba('ativos')}
                        >
                            Ativos
                        </button>

                        <button
                            className={aba === 'resolvidos' ? 'aba ativa' : 'aba'}
                            onClick={() => setAba('resolvidos')}
                        >
                            Resolvidos
                        </button>
                    </div>
                </div>

                <div className="painel">
                    <table>
                        <thead>
                            <tr>
                                <th>ID Alerta</th>
                                <th>Lixeira</th>
                                <th>Localização</th>
                                <th>Nível</th>
                                <th>Data/Hora</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lista.map((item) => (
                                <tr key={item.id}>
                                    <td>ALT-00{item.id}</td>
                                    <td>LIX-00{item.id}</td>
                                    <td>{item.localizacao}</td>
                                    <td>{item.nivel}%</td>
                                    <td>{new Date().toLocaleString('pt-BR')}</td>
                                    <td>
                                        <span className={item.status_lixeira === 'Coletada' ? 'badge-resolvido' : 'badge-alerta'}>
                                            {item.status_lixeira === 'Coletada' ? 'Resolvido' : 'Ativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                              className="icone-acao"

                                                 onClick={() => resolver(item)}
                                                                                    >
                                                                            ✅
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {lista.length === 0 && (
                        <p className="sem-alertas">Nenhum alerta encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Alertas;