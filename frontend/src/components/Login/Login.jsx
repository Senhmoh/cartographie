import React from 'react';

function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-card">
      <h1 className="login-title gradient-text">Connectez-vous</h1>
      <p className="login-subtitle">Entrez vos identifiants de connexion</p>
        <form className="login-form">
          <div className="input-group">
            <input type="email" id="email" required />
            <label htmlFor="email">Adresse mail</label>
          </div>
          <div className="input-group">
            <input type="password" id="password" required />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <button type="submit" className="btn-submit gradient-btn">Connexion</button>
          </form>
        <div className="login-footer">
          <a href="#!" className="forgot-password">Mot de passe oublié ?</a>
          <p className="signup-text">
            Vous n'avez pas de compte ? <a href="#!">Inscription</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
