import React, { useState } from 'react';
import { connexionUtilisateur } from '../../services/api'; // Import de l'API pour la connexion
import { useAuth } from '../../providers/AuthProvider'; // Import du contexte Auth
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', mot_de_passe: '' });
  const [error, setError] = useState('');
  const { login } = useAuth(); // Utilise la fonction login depuis AuthProvider
  const navigate = useNavigate();

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await connexionUtilisateur(formData);
      login(data.token); // Utilise la méthode login pour gérer le token et l'état utilisateur
      setError('');
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title gradient-text">Connectez-vous</h1>
        <p className="login-subtitle">Entrez vos identifiants de connexion</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Adresse mail</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <button type="submit" className="btn-submit gradient-btn">
            Connexion
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
        <div className="login-footer">
          <a href="#!" className="forgot-password">
            Mot de passe oublié ?
          </a>
          <p className="signup-text">
            Vous n'avez pas de compte ? <a href="/inscription">Inscription</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
