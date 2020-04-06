import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './style.css';
import hereoesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg';

toast.configure();

function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    localStorage.setItem('ongId', '');

    const notify = () => {
        toast.success('Falha no login, tente novamente.', {className: 'toastify'});
    }

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            notify();
        }
    }

    return(
        <div className="container-Logon">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input required placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#e02041"></FiLogIn>Não tenho cadastro</Link>
                    <Link to="/logon/admin" className="back-link back-link-2"><FiLogIn size={16} color="#e02041"></FiLogIn>Ambiente de admin</Link>
                </form>
            </section>

            <img src={hereoesImg} alt="heroes"/>
        </div>
    );
}

export default Logon;