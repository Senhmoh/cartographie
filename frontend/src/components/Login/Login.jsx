import React, { useState } from 'react';
import { connexionUtilisateur } from '../../services/api'; // API pour la connexion
import { useAuth } from '../../providers/AuthProvider'; // Contexte Auth
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', mot_de_passe: '' });
    const [error, setError] = useState('');
    const { login } = useAuth(); // Gestion de la connexion utilisateur
    const navigate = useNavigate();
    const [cookiesActivated, setCookiesActivated] = useState(false); // État pour activer les cookies

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validation des champs côté frontend avant soumission
    const validateForm = () => {
        if (!formData.email || !formData.mot_de_passe) {
            setError('Tous les champs sont requis.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Veuillez entrer un email valide.');
            return false;
        }
        return true;
    };

     // Fonction pour activer les cookies via une interaction utilisateur
     const activateCookies = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/test-cookies`, {
                credentials: 'include',
            });
            setCookiesActivated(true); // Marquer les cookies comme activés
        } catch (err) {
            console.error('Erreur lors de l\'activation des cookies :', err);
            setError('Impossible d\'activer les cookies. Veuillez réessayer.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            // Activer les cookies avant de soumettre
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/test-cookies`, {
                credentials: 'include',
            });
    
            // Effectuer la connexion après activation des cookies
            await connexionUtilisateur({
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
            });
    
            // Utilisation du contexte pour synchroniser l'état utilisateur
            await login();
    
            // Nettoyage des erreurs et redirection après succès
            setError('');
            navigate('/');
        } catch (err) {
            setError(err.message || 'Identifiants incorrects ou échec de l\'activation des cookies.');
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
                    {/* Lien vers "Mot de passe oublié" */}
                    <p>
                        <Link to="/forgot-password" className="auth-link">Mot de passe oublié ?</Link>
                    </p>
                    <p>
                        Pas encore inscrit ? <Link to="/inscription" className="auth-link">Créez un compte</Link>
                    </p>
                </div>
            </div>
        </div>
    );
    
}

export default LoginForm;
