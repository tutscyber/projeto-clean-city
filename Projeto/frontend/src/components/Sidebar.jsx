import { Link } from 'react-router-dom';

function Sidebar() {

    return (

        <div className='sidebar'>

            <h2>Clean City</h2>

            <button
    className="botao-sair"
    onClick={() => window.location.href = '/'}
>
    Sair
</button>

            <Link to='/dashboard'>
                Dashboard
            </Link>

            <Link to='/lixeiras'>
                Lixeiras
            </Link>

            <Link to='/coletas'>
                Coletas
            </Link>

            <Link to='/caminhoes'>
                Caminhões
            </Link>

            <Link to='/alertas'>
                Alertas
            </Link>

            <Link to='/usuarios'>
                Usuários
            </Link>

        </div>
    )
}

export default Sidebar;