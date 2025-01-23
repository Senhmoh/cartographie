import axios from 'axios';

// Crée une instance Axios
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Charge l'URL depuis les variables d'environnement
    withCredentials: true, // Inclut les cookies dans toutes les requêtes
});

// Ajout d'un intercepteur pour gérer automatiquement les erreurs (ex. : 401)
api.interceptors.response.use(
    (response) => response, // Retourne la réponse si elle est réussie
    async (error) => {
        // Gérer les erreurs globales (exemple : affichage d'un message d'erreur global ou tentative de rafraîchir le token)
        if (error.response?.status === 401) {
            console.error("Erreur d'authentification : l'utilisateur doit se reconnecter.");

            try {
                // Tenter de rafraîchir le token
                await api.post('/auth/refresh-token');

                // Relancer la requête initiale après rafraîchissement du token
                return api.request(error.config);
            } catch (refreshError) {
                console.error("Le rafraîchissement du token a échoué, déconnexion nécessaire.");
                // Déconnexion en cas d'échec de rafraîchissement
                window.location.href = '/login';
            }
        }
        return Promise.reject(error); // Rejette les erreurs pour un traitement local
    }
);

// Fonctions pour interagir avec l'API
export const fetchMetiers = async () => {
    const response = await api.get('/metiers');
    return response.data;
};

export const fetchThematiques = async () => {
    const response = await api.get('/thematiques');
    return response.data;
};

export const fetchComposantes = async () => {
    const response = await api.get('/composantes');
    return response.data;
};

export const fetchImpacts = async (filters) => {
    const response = await api.get('/impacts', { params: filters });
    return response.data;
};

export const inscriptionUtilisateur = async (formData) => {
    try {
        const response = await api.post('/auth/inscription', formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Erreur lors de l\'inscription.' };
    }
};

export const connexionUtilisateur = async (formData) => {
    try {
        const response = await api.post('/auth/connexion', formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Erreur lors de la connexion.' };
    }
};

export const fetchUserChecklists = async (utilisateurId) => {
    console.log("fetchUserChecklists appelé avec :", utilisateurId);
    try {
        const response = await api.get(`/checklists?utilisateurId=${utilisateurId}`);
        console.log("Données reçues par fetchUserChecklists :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur dans fetchUserChecklists :", error);
        throw error;
    }
};

export const fetchChecklistDetails = async (id) => {
    const response = await api.get(`/checklists/${id}`);
    return response.data;
};


export const createChecklist = async ({ nom_checklist, utilisateur, impacts }) => {
    try {
        const response = await api.post('/checklists', {
            nom_checklist,
            utilisateur,
            impacts,
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la checklist :", error);
        throw error;
    }
};

export const updateChecklistTitle = async (id, newTitle) => {
    try {
      const response = await api.put(`/checklists/${id}/title`, { nom_checklist: newTitle });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du titre :", error);
      throw error;
    }
  };

  export const updateChecklistImpactStatut = async (id, statut) => {
    try {
      const response = await api.put(`/checklist-impacts/${id}/statut`, { statut });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
      throw error;
    }
  };
  
  
  

export const deconnexionUtilisateur = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
};

export default api;
