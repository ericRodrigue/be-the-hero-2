import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiPower } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';

toast.configure();

function ProfileAdmin() {
    const [ongs, setOngs] = useState([]);
    const login = localStorage.getItem('adminLogin');
    const history = useHistory();

    if(!login){
        history.push('/logon/admin');
    }

    useEffect(() => {
        api.get('/administrator/profile').then(response => {
            setOngs(response.data);
        })
    });

    const notify = () => {
        toast.success('Erro ao deletar a ONG, tente novamente.', {className: 'toastify'});
    }

    async function handleLogout(){
        localStorage.clear();

        history.push('/logon/admin');
    }

    async function handleDeleteOng(id){
        try{
            await api.delete(`administrator/profile/${id}`);

            setOngs(ongs.filter(ong => ong.id  !== id));
        }catch(err){
            notify();
        }
    }

    return (
        <div className="profile-admin-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span className="elemento"></span>
                <button onClick={handleLogout}><FiPower size={18} color="#e02041"></FiPower></button>
            </header>

            <h1>ONGs Cadastradas</h1>

            <ul>
                {ongs.length > 0 ? (ongs.map(ong => (
                    <li key={ong.id}>
                        <strong>NOME:</strong>
                        <p>{ong.name}</p>

                        <strong>EMAIL:</strong>
                        <p>{ong.email}</p>

                        <strong>CIDADE:</strong>
                        <p>{ong.city}</p>

                        <button onClick={() => handleDeleteOng(ong.id)} type="button"><FiTrash2 size={16} color="#a8a8b3"></FiTrash2></button>
                    </li>
                ))) : (
                        <h4 className="aviso-ongs-vazias">Não há ONGs cadastradas!</h4>
                )}
            </ul>
        </div>
    );
}

export default ProfileAdmin;
