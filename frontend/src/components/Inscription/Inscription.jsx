import React, { useState } from 'react';
import { inscriptionUtilisateur } from '../../services/api';

const Inscription = () => {
    const [formData, setFormData] = useState({ nom_utilisateur: '', email: '', mot_de_passe: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await inscriptionUtilisateur(formData);
            setMessage(data.message); // Message du backend
            setError('');
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="nom_utilisateur"
                        placeholder="Nom d'utilisateur"
                        value={formData.nom_utilisateur}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="mot_de_passe"
                        placeholder="Mot de passe"
                        value={formData.mot_de_passe}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Inscription;
