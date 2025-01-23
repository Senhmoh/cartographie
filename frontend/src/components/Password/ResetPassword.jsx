import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Erreur lors de la réinitialisation.');
        }
    };

    return (
        <div>
            <h1>Réinitialiser le mot de passe</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Réinitialiser</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
