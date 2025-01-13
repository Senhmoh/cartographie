import React, { useState } from 'react';
import { inscriptionUtilisateur } from '../../services/api'; // API pour l'inscription
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [formData, setFormData] = useState({ nom_utilisateur: '', email: '', mot_de_passe: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await inscriptionUtilisateur(formData);
            setSuccess(true);
            setError('');
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
        }
    };

    const handleRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {!success ? (
                    <>
                        <h1 className="auth-title gradient-text">Inscription</h1>
                        <p className="auth-subtitle">Créez votre compte pour accéder à l'application</p>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    id="nom_utilisateur"
                                    name="nom_utilisateur"
                                    value={formData.nom_utilisateur}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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
                            <button type="submit" className="btn auth-btn">Créer un compte</button>
                        </form>
                    </>
                ) : (
                    <div className="auth-success">
                        <h1 className="auth-title gradient-text">Inscription réussie</h1>
                        <p className="auth-message">Votre compte a été créé avec succès.</p>
                        <button onClick={handleRedirect} className="btn auth-btn">Se connecter</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SignupForm;
