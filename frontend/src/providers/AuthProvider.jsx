import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Créer le contexte
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState({
        id: null,
        nom_utilisateur: "",
    });
        const navigate = useNavigate();

    // Fonction pour décoder le token (remplace jwt_decode)
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
            localStorage.removeItem('token');
            return null;
        }
    };
    
    

    // Vérifier le token au chargement
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token récupéré :", token);
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/validate-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Token invalide ou expiré');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Utilisateur valide :", data);
                    setUtilisateur(decoded);
                })
                .catch((error) => {
                    console.error("Erreur de validation du token :", error);
                    localStorage.removeItem('token');
                    setUtilisateur(null);
                });
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

export const useAuth = () => {
    return useContext(AuthContext);
};

