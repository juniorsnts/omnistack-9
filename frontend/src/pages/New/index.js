import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{
                    backgroundImage: `url(${preview})`
                }}
                className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                type="text"
                id="company"
                placeholder="Sua empresa incrivel" />

            <label htmlFor="techs">Tecnologias * <span>Separadas por virgula</span></label>
            <input
                value={techs}
                onChange={(event) => setTechs(event.target.value)}
                type="text"
                id="techs"
                placeholder="Quais tecnologias usam?" />

            <label htmlFor="price">Valor da diaria * <span>(em branco para gratuito)</span></label>
            <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                type="text"
                id="price"
                placeholder="Valor cobrado por dia" />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}
