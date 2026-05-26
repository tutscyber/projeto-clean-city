import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapaColeta from '../components/MapaColeta';
import api from '../services/api';

function Coletas() {
    const [motoristas, setMotoristas] = useState([]);
    const [motoristaSelecionado, setMotoristaSelecionado] = useState(null);

    async function carregarMotoristas() {
        const resposta = await api.get('/motoristas');
        setMotoristas(resposta.data);

        if (resposta.data.length > 0) {
            setMotoristaSelecionado(resposta.data[0]);
        }
    }

    useEffect(() => {
        carregarMotoristas();
    }, []);

    return (
        <div className="layout">
            <Sidebar />

            <div className="conteudo">
                <h1>Coletas</h1>

                <div className="coleta-grid">
                    <div className="painel">
                        <h2>Motoristas Disponíveis</h2>

                        {motoristas.map((motorista) => (
                            <div
                                key={motorista.id}
                                className={
                                    motoristaSelecionado?.id === motorista.id
                                        ? 'card-motorista ativo'
                                        : 'card-motorista'
                                }
                                onClick={() => setMotoristaSelecionado(motorista)}
                            >
                                <strong>{motorista.nome}</strong>
                                <p>{motorista.email}</p>
                                <span>{motorista.tipo}</span>
                            </div>
                        ))}
                    </div>

                    <div className="painel">
                        <h2>Rota da Coleta</h2>

                        {motoristaSelecionado && (
                            <div className="rota-info">
                                <p>
                                    <strong>Motorista:</strong> {motoristaSelecionado.nome}
                                </p>

                                <p>
                                    <strong>Status:</strong> Em rota
                                </p>
                            </div>
                        )}

                        <MapaColeta motorista={motoristaSelecionado?.nome} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coletas;