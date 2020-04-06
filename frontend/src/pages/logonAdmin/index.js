import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './style.css';
import hereoesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg';

toast.configure();

function LogonAdmin() {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const history = useHistory();
    localStorage.setItem('adminLogin', '');

    const notify = () => {
        toast.success('Falha no login, tente novamente.', {className: 'toastify'});
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            await api.post('sessions/admin', { login, pass });

            localStorage.setItem('adminLogin', login);

            history.push('/administrator/profile');
        } catch (err) {
            notify();
        }
    }

    return (
        <div className="container-Logon">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon admin</h1>

                    <input required placeholder="Sue logon" value={login} onChange={e => setLogin(e.target.value)} />
                    <input type="password" required placeholder="Sua senha" value={pass} onChange={e => setPass(e.target.value)} />
                    <button className="button" type="submit">Logar</button>

                    <Link to="/" className="back-link"><FiArrowLeft size={16} color="#e02041"></FiArrowLeft>Voltar ao login das ONGs</Link>
                </form>
            </section>

            <img src={hereoesImg} alt="heroes" />
        </div>
    );
}

export default LogonAdmin;