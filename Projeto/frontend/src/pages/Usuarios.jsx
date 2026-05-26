import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('Administrador');
    const [idEditar, setIdEditar] = useState(null);

    async function carregar() {
        const resposta = await api.get('/usuarios');
        setUsuarios(resposta.data);
    }

    useEffect(() => {
        carregar();
    }, []);

    function limparCampos() {
        setNome('');
        setEmail('');
        setSenha('');
        setTipo('Administrador');
        setIdEditar(null);
    }

    async function cadastrar() {
        await api.post('/usuarios', {
            nome,
            email,
            senha,
            tipo
        });

        alert('Usuário cadastrado');
        limparCampos();
        carregar();
    }

    async function atualizar() {
        await api.put(`/usuarios/${idEditar}`, {
            nome,
            email,
            senha,
            tipo
        });

        alert('Usuário atualizado');
        limparCampos();
        carregar();
    }

    async function excluir(id) {
        await api.delete(`/usuarios/${id}`);

        alert('Usuário excluído');
        carregar();
    }

    function editar(usuario) {
        setIdEditar(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha(usuario.senha);
        setTipo(usuario.tipo);
    }

    const totalAdmin = usuarios.filter(item => item.tipo === 'Administrador').length;
    const totalMotoristas = usuarios.filter(item => item.tipo === 'Motorista').length;

    return (
        <div className="layout">
            <Sidebar />

            <div className="conteudo">
                <div className="topo">
                    <div>
                        <h1>Usuários</h1>
                        <p>Gerencie administradores e motoristas do sistema</p>
                    </div>
                </div>

                <div className="cards-dashboard">
                    <div className="card-info">
                        <span className="icone">👥</span>
                        <div>
                            <p>Total de Usuários</p>
                            <h2>{usuarios.length}</h2>
                            <small>Cadastrados no sistema</small>
                        </div>
                    </div>

                    <div className="card-info">
                        <span className="icone">🛡️</span>
                        <div>
                            <p>Administradores</p>
                            <h2>{totalAdmin}</h2>
                            <small>Controle do sistema</small>
                        </div>
                    </div>

                    <div className="card-info">
                        <span className="icone">🚛</span>
                        <div>
                            <p>Motoristas</p>
                            <h2>{totalMotoristas}</h2>
                            <small>Responsáveis pelas rotas</small>
                        </div>
                    </div>
                </div>

                <div className="painel">
                    <h2>{idEditar ? 'Editar Usuário' : 'Novo Usuário'}</h2>

                    <div className="formulario-usuarios">
                        <input
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Motorista">Motorista</option>
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
                            <button onClick={limparCampos} className="botao-cancelar">
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>

                <div className="painel">
                    <h2>Lista de Usuários</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>USR-00{usuario.id}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <span className={usuario.tipo === 'Administrador' ? 'badge-admin' : 'badge-motorista'}>
                                            {usuario.tipo}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => editar(usuario)}>
                                            Editar
                                        </button>

                                        <button
                                            className="botao-excluir"
                                            onClick={() => excluir(usuario.id)}
                                        >
                                            Excluir
                                        </button>
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

export default Usuarios;