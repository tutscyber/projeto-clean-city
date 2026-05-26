import { useState } from 'react';

import api from '../services/api';

function Login() {

    const [email, setEmail] = useState('');

    const [senha, setSenha] = useState('');

    async function entrar() {

        try {

            const resposta = await api.post('/login', {

                email,
                senha
            });

            console.log(resposta.data);

            if(resposta.data.sucesso) {

                window.location.href = '/dashboard';

            } else {

                alert('Login inválido');
            }

        } catch(erro) {

            console.log(erro);

            alert('Erro ao conectar com servidor');
        }
    }

    return (

        <div className='login'>

            <h1>Clean City</h1>

            <input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type='password'
                placeholder='Senha'
                onChange={(e) => setSenha(e.target.value)}
            />

            <button onClick={entrar}>
                Entrar
            </button>

        </div>
    )
}

export default Login;