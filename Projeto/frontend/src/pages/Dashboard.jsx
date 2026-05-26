import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import MapaCidade from '../components/MapaCidade';

function Dashboard() {
    const [lixeiras, setLixeiras] = useState([]);

    async function carregar() {
        const resposta = await api.get('/lixeiras');
        setLixeiras(resposta.data);
    }

    useEffect(() => {
        carregar();
    }, []);

    const ultimosAlertas = lixeiras.filter(item => Number(item.nivel) > 80);

    const verdes = lixeiras.filter(item => Number(item.nivel) <= 40).length;

    const amarelos = lixeiras.filter(item =>
        Number(item.nivel) > 40 && Number(item.nivel) <= 80
    ).length;

    const vermelhos = lixeiras.filter(item =>
        Number(item.nivel) > 80
    ).length;

    const total = lixeiras.length || 1;

    const porcentagemVerde = (verdes / total) * 100;

    const porcentagemAmarelo = (amarelos / total) * 100;

    return (
        <div className="layout">
            <Sidebar />

            <div className="conteudo">
                <h1>Dashboard</h1>

                <div className="cards-dashboard">
                    <div className="card-info">
                        <span className="icone">🗑️</span>
                        <div>
                            <p>Lixeiras Ativas</p>
                            <h2>{lixeiras.length}</h2>
                            <small>Total monitorado</small>
                        </div>
                    </div>

                    <div className="card-info">
                        <span className="icone">⚠️</span>
                        <div>
                            <p>Alertas Ativos</p>
                            <h2>{ultimosAlertas.length}</h2>
                            <small>Nível crítico</small>
                        </div>
                    </div>
                </div>

                <div className="area-meio">
                    

                   <div className="painel">
                        <h3>Mapa da Cidade</h3>
                        <MapaCidade />
                            </div>

                    <div className="painel">
                        <h3>Lixeiras por Nível de Preenchimento</h3>

                        <div className="grafico-area">
                            <div
                                className="donut"
                                style={{
                                    background: `conic-gradient(
                                        #3f9142 0% ${porcentagemVerde}%,
                                        #e7b75f ${porcentagemVerde}% ${porcentagemVerde + porcentagemAmarelo}%,
                                        #e75b4c ${porcentagemVerde + porcentagemAmarelo}% 100%
                                    )`
                                }}
                            ></div>

                            <div className="legenda">
                                <p><span className="verde-box"></span> 0% - 40% ({verdes})</p>
                                <p><span className="amarelo-box"></span> 41% - 80% ({amarelos})</p>
                                <p><span className="vermelho-box"></span> 81% - 100% ({vermelhos})</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="painel">
                    <h3>Últimos Alertas</h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Lixeira</th>
                                <th>Localização</th>
                                <th>Nível</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ultimosAlertas.map((item) => (
                                <tr key={item.id}>
                                    <td>LIX-{item.id}</td>
                                    <td>{item.localizacao}</td>
                                    <td>{item.nivel}%</td>
                                    <td>
                                        <span className="badge-alerta">
                                            Crítico
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;