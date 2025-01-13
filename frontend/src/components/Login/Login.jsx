import React, { useState } from 'react';
import { connexionUtilisateur } from '../../services/api'; // API pour la connexion
import { useAuth } from '../../providers/AuthProvider'; // Contexte Auth
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', mot_de_passe: '' });
    const [error, setError] = useState('');
    const { login } = useAuth(); // Gestion du token utilisateur
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await connexionUtilisateur(formData);
            login(data.token);
            setError('');
            navigate('/'); // Redirection après connexion
        } catch (err) {
            setError(err.message || 'Identifiants incorrects.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title gradient-text">Connexion</h1>
                <p className="auth-subtitle">Veuillez entrer vos identifiants pour continuer</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Adresse mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="mot_de_passe">Mot de passe</label>
                        <input
                            type="password"
                            id="mot_de_passe"
                            name="mot_de_passe"
                            value={formData.mot_de_passe}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn auth-btn">Connexion</button>
                </form>
                <div className="auth-footer">
                    <a href="#!" className="auth-link">Mot de passe oublié ?</a>
                    <p>Pas encore inscrit ? <a href="/inscription" className="auth-link">Créez un compte</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
