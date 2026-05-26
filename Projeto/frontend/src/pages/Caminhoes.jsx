import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapaColeta from '../components/MapaColeta';
import api from '../services/api';

function Caminhoes() {
    const [caminhoes, setCaminhoes] = useState([]);
    const [motoristas, setMotoristas] = useState([]);

    const [placa, setPlaca] = useState('');
    const [motorista, setMotorista] = useState('');
    const [status, setStatus] = useState('Disponível');
    const [idEditar, setIdEditar] = useState(null);

    async function carregar() {
        const respostaCaminhoes = await api.get('/caminhoes');
        const respostaMotoristas = await api.get('/motoristas');

        setCaminhoes(respostaCaminhoes.data);
        setMotoristas(respostaMotoristas.data);

        if (respostaMotoristas.data.length > 0 && motorista === '') {
            setMotorista(respostaMotoristas.data[0].nome);
        }
    }

    useEffect(() => {
        carregar();
    }, []);

    function limparCampos() {
        setPlaca('');
        setStatus('Disponível');
        setIdEditar(null);

        if (motoristas.length > 0) {
            setMotorista(motoristas[0].nome);
        } else {
            setMotorista('');
        }
    }

    async function cadastrar() {
        await api.post('/caminhoes', {
            placa,
            motorista,
            status_caminhao: status
        });

        alert('Caminhão cadastrado');

        limparCampos();
        carregar();
    }

    async function atualizar() {
        await api.put(`/caminhoes/${idEditar}`, {
            placa,
            motorista,
            status_caminhao: status
        });

        alert('Caminhão atualizado');

        limparCampos();
        carregar();
    }

    async function excluir(id) {
        const confirmar = window.confirm('Tem certeza que deseja excluir?');

        if (!confirmar) {
            return;
        }

        await api.delete(`/caminhoes/${id}`);

        alert('Caminhão excluído');

        carregar();
    }

    function editar(caminhao) {
        setIdEditar(caminhao.id);
        setPlaca(caminhao.placa);
        setMotorista(caminhao.motorista);
        setStatus(caminhao.status_caminhao);
    }

    const caminhaoSelecionado = caminhoes.length > 0 ? caminhoes[0] : null;

    return (
        <div className="layout">
            <Sidebar />

            <div className="conteudo">
                <h1>Caminhões</h1>

                <div className="motorista-grid">
                    <div className="painel">
                        <h2>{idEditar ? 'Editar Caminhão' : 'Cadastrar Caminhão'}</h2>

                        <div className="formulario-caminhao">
                            <input
                                placeholder="Placa"
                                value={placa}
                                onChange={(e) => setPlaca(e.target.value)}
                            />

                            <select
                                value={motorista}
                                onChange={(e) => setMotorista(e.target.value)}
                            >
                                {motoristas.map((item) => (
                                    <option key={item.id} value={item.nome}>
                                        {item.nome}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Disponível">Disponível</option>
                                <option value="Em rota">Em rota</option>
                                <option value="Manutenção">Manutenção</option>
                            </select>

                            {idEditar ? (
                                <button onClick={atualizar}>
                                    Atualizar
                                </button>
                            ) : (
                                <button onClick={cadastrar}>
                                    Cadastrar
                                </button>
                            )}

                            {idEditar && (
                                <button className="botao-cancelar" onClick={limparCampos}>
                                    Cancelar
                                </button>
                            )}
                        </div>

                        <h2>Lista de Caminhões</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Placa</th>
                                    <th>Motorista</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {caminhoes.map((item) => (
                                    <tr key={item.id}>
                                        <td>CAM-00{item.id}</td>
                                        <td>{item.placa}</td>
                                        <td>{item.motorista}</td>
                                        <td>{item.status_caminhao}</td>
                                        <td>
                                            <button onClick={() => editar(item)}>
                                                Editar
                                            </button>

                                            <button
                                                className="botao-excluir"
                                                onClick={() => excluir(item.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="painel">
                        <h2>Rota do Caminhão</h2>

                        {caminhaoSelecionado && (
                            <div className="rota-info">
                                <p><strong>Motorista:</strong> {caminhaoSelecionado.motorista}</p>
                                <p><strong>Placa:</strong> {caminhaoSelecionado.placa}</p>
                                <p><strong>Status:</strong> {caminhaoSelecionado.status_caminhao}</p>
                            </div>
                        )}

                        <MapaColeta motorista={caminhaoSelecionado?.motorista} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Caminhoes;