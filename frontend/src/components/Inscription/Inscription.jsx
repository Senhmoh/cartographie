import React, { useState } from 'react';
import { inscriptionUtilisateur } from '../../services/api'; // API pour l'inscription
import { useAuth } from '../../providers/AuthProvider'; // Contexte Auth
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [formData, setFormData] = useState({
        nom_utilisateur: '',
        email: '',
        mot_de_passe: '',
        confirm_mot_de_passe: '',
        rgpd_accepted: false,
        formation_accepted: false // Nouvelle clé ajoutée
    });
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasNumber: false,
        hasUpperCase: false
    });
    const [error, setError] = useState('');
    const { login } = useAuth(); // Appel à login pour synchroniser l'état utilisateur
    const navigate = useNavigate();

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

        // Mise à jour des critères de mot de passe
        if (name === 'mot_de_passe') {
            setPasswordCriteria({
                minLength: value.length >= 10,
                hasNumber: /\d/.test(value),
                hasUpperCase: /[A-Z]/.test(value)
            });
        }
    };

    // Validation des champs côté frontend avant soumission
    const validateForm = () => {
        if (!formData.nom_utilisateur || !formData.email || !formData.mot_de_passe || !formData.confirm_mot_de_passe) {
            setError('Tous les champs sont requis.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Veuillez entrer un email valide.');
            return false;
        }
        if (!passwordCriteria.minLength || !passwordCriteria.hasNumber || !passwordCriteria.hasUpperCase) {
            setError('Le mot de passe ne remplit pas tous les critères requis.');
            return false;
        }
        if (formData.mot_de_passe !== formData.confirm_mot_de_passe) {
            setError('Les mots de passe ne correspondent pas.');
            return false;
        }
        if (!formData.rgpd_accepted) {
            setError('Vous devez accepter les conditions RGPD pour continuer.');
            return false;
        }
        return true;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await inscriptionUtilisateur({
                nom_utilisateur: formData.nom_utilisateur,
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
                formation: formData.formation_accepted
            });
            await login(); // Synchronise l'état utilisateur
            setError('');
            navigate('/'); // Redirection vers la page d'accueil après inscription réussie
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
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
                        <ul className="password-criteria">
                            <li className={passwordCriteria.minLength ? 'valid' : 'invalid'}>Au moins 10 caractères</li>
                            <li className={passwordCriteria.hasNumber ? 'valid' : 'invalid'}>Contient un chiffre</li>
                            <li className={passwordCriteria.hasUpperCase ? 'valid' : 'invalid'}>Contient une majuscule</li>
                        </ul>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm_mot_de_passe">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirm_mot_de_passe"
                            name="confirm_mot_de_passe"
                            value={formData.confirm_mot_de_passe}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group rgpd-group">
                        <input
                            type="checkbox"
                            id="rgpd_accepted"
                            name="rgpd_accepted"
                            checked={formData.rgpd_accepted}
                            onChange={handleChange}
                        />
                        <label htmlFor="rgpd_accepted">
                            J'accepte les <a href="/privacy" target="_blank" className="auth-link">conditions générales RGPD</a>
                        </label>
                    </div>
                    <div className="input-group rgpd-group">
                        <input
                                  type="checkbox"
                                  id="formation_accepted"
                                  name="formation_accepted"
                                  checked={formData.formation_accepted}
                                  onChange={handleChange}
                        />
                        <label htmlFor="formation_accepted">
                            J'accepte que mes données soient utilisées à des fins de formation (facultatif)
                        </label>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn auth-btn">Créer un compte</button>
                </form>
                <div className="auth-footer">
                    <p>Déjà inscrit ? <a href="/login" className="auth-link">Connectez-vous</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
