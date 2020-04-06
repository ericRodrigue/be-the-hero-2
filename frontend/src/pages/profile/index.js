import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';

toast.configure();

function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    if(!ongId){
        history.push('/');
    }

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    const notify = () => {
        toast.success('Erro ao deletar o caso, tente novamente.', {className: 'toastify'});
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            notify();
        }
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}><FiPower size={18} color="#e02041"></FiPower></button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.length > 0 ? (incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRl'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"><FiTrash2 size={16} color="#a8a8b3"></FiTrash2></button>
                    </li>
                ))): (
                    <h4 className="aviso-cadastros-vazios">Não há casos cadastrados!</h4>
                )}
            </ul>
        </div>
    );
}

export default Profile;
