import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Créer le contexte
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const navigate = useNavigate();

    // Fonction pour décoder le token (remplace jwt_decode)
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1]; // Récupère la payload
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
                    .join('')
            );
            const decoded = JSON.parse(jsonPayload);
            console.log("Payload décodée :", decoded); // Ajoutez ce log
            return decoded;
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
            return null;
        }
    };
    

    // Vérifier le token au chargement
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setUtilisateur(decoded);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, []);

    // Fonction pour connecter l'utilisateur
    const login = (token) => {
        if (!token) {
            console.error("Token invalide ou manquant");
            return;
        }
        localStorage.setItem('token', token);
        const decoded = decodeToken(token);
        if (decoded) {
            setUtilisateur(decoded);
            navigate('/'); // Redirige vers la page d'accueil
        }
    };

    // Fonction pour déconnecter l'utilisateur
    const logout = () => {
        localStorage.removeItem('token');
        setUtilisateur(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ utilisateur, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser l'authentification
export const useAuth = () => {
    return useContext(AuthContext);
};
