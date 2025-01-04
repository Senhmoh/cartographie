import React, { useState } from 'react';
import { inscriptionUtilisateur } from '../../services/api'; // Import de l'API pour l'inscription
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [formData, setFormData] = useState({ nom_utilisateur: '', email: '', mot_de_passe: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inscriptionUtilisateur(formData);
      setIsSuccess(true); // Passe en mode "Succès"
      setError('');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
    }
  };

  // Gestion du bouton "Fermer"
  const handleClose = () => {
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {!isSuccess ? (
          <>
            <h1 className="login-title gradient-text">Inscrivez-vous</h1>
            <p className="login-subtitle">Créez votre compte pour accéder à l'application</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  id="nom_utilisateur"
                  name="nom_utilisateur"
                  value={formData.nom_utilisateur}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
              </div>
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
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="mot_de_passe">Mot de passe</label>
              </div>
              <button type="submit" className="btn-submit gradient-btn">
                Inscription
              </button>
            </form>
            {error && <p className="error-text">{error}</p>}
          </>
        ) : (
          <>
            <h1 className="success-title gradient-text">Inscription réussie</h1>
            <button onClick={handleClose} className="btn-submit gradient-btn">
              Fermer
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupForm;
