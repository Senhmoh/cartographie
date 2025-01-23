import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Indique si l'utilisateur est authentifié
    const [loading, setLoading] = useState(true); // Par défaut, en cours de vérification
    
    const navigate = useNavigate();

    // Fonction pour récupérer l'utilisateur authentifié
    const fetchAuthenticatedUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
                credentials: 'include',
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    await refreshAccessToken(); // Tente de rafraîchir le token
                    return null; // Aucune donnée utilisateur
                }
                throw new Error('Utilisateur non authentifié');
            }
    
            const userData = await response.json();
            setUtilisateur(userData);
            setIsAuthenticated(true);
            return userData; // Retourne les données utilisateur
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            logout();
            return null;
        }
    };
    
    

   // Initialiser l'état au chargement de l'application
   useEffect(() => {
    const initializeAuth = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
                method: 'GET',
                credentials: 'include', // Inclure les cookies
            });

            if (response.ok) {
                const userData = await response.json();
                setUtilisateur(userData); // Mettre à jour l'état utilisateur
                setIsAuthenticated(true);
                return;
            }

            if (response.status === 401) {
                console.warn('Token expiré, tentative de rafraîchissement...');
                await refreshAccessToken();
                // Relance la récupération de l'utilisateur après un rafraîchissement
                const retryResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (retryResponse.ok) {
                    const retryUserData = await retryResponse.json();
                    setUtilisateur(retryUserData);
                    setIsAuthenticated(true);
                    return;
                }
            }

            console.error('Utilisateur non authentifié après tentative.');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'authentification :', error);
        } finally {
            setLoading(false); // Terminer la vérification, quel que soit le résultat
        }
    };

    initializeAuth();
}, []);





    // Fonction pour connecter l'utilisateur
    const login = async () => {
        try {
            await fetchAuthenticatedUser();
            navigate('/'); // Redirige vers la page d'accueil après connexion
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    // Fonction pour déconnecter l'utilisateur
    const logout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Inclure les cookies
            });
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        } finally {
            setUtilisateur(null);
            setIsAuthenticated(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 5 * 60 * 1000); // Toutes les 5 minutes
        return () => clearInterval(interval);
    }, []);
    
    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include',
            });
    
            if (!response.ok) {
                console.error('Erreur lors du rafraîchissement du token');
                throw new Error('Rafraîchissement échoué');
            }
    
        } catch (error) {
            console.error('Erreur dans refreshAccessToken :', error);
            setUtilisateur(null); // Réinitialiser l'état utilisateur
            setIsAuthenticated(false); // Considérer l'utilisateur déconnecté
        }
    };
    
    

    return (
        <AuthContext.Provider value={{ utilisateur, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
