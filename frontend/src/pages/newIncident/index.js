import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './style.css';

function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const data = { title, description, value};
    const history = useHistory();
    
    if(!ongId){
        history.push('/');
    }

    async function handleNewIncident(e){
        e.preventDefault();

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');
        }catch(err){
            alert('Falha ao cadastrar incidente, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link"><FiArrowLeft size={16} color="#e02041"></FiArrowLeft>Voltar para home</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input required placeholder="Titulo do caso" value={title} onChange={e => setTitle(e.target.value)}/>
                    <textarea required placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input required placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>

                    <button className="button" type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;