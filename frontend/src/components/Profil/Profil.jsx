// Profil.jsx
import React, { useState, useEffect } from "react";
import { fetchUserChecklists } from "../../services/api";
import { useAuth } from "../../providers/AuthProvider";

const Profil = () => {
    const { utilisateur } = useAuth();
    const [checklists, setChecklists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (utilisateur?.id) {
                    const data = await fetchUserChecklists(utilisateur.id);
                    setChecklists(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des checklists :", error);
            } finally {
                setLoading(false);
            }
        };

        if (utilisateur) {
            fetchData();
        }
    }, [utilisateur]);

    return (
        <div className="user-profile-container">
            <h2 className="page-title">Votre Profil</h2>
            {!utilisateur ? (
                <p className="error-message">Veuillez vous connecter pour voir vos checklists.</p>
            ) : (
                <>
                    <p className="welcome-message">Bienvenue, {utilisateur.nom_utilisateur || "Utilisateur"} !</p>
    
                    {loading ? (
                        <p className="loading-message">Chargement des checklists...</p>
                    ) : checklists.length > 0 ? (
                        <div className="profile-checklists-grid"> {/* Grille mise à jour */}
                            {checklists.map((checklist) => (
                                <div key={checklist.id_checklist} className="profile-impact-card">
                                <h4 className="checklist-title">{checklist.nom_checklist || "Checklist sans nom"}</h4>
                                <p className="checklist-date">Créée le : {new Date(checklist.date_creation).toLocaleDateString("fr-FR")}</p>
                                <button className="view-details-button" onClick={() => handleViewChecklist(checklist.id_checklist)}>
                                    Voir les détails
                                </button>
                                    <div className="impacts-section">
                                        <h5 className="impacts-title">Impacts :</h5>
                                        {checklist.ChecklistImpacts?.length > 0 ? (
                                            checklist.ChecklistImpacts.map((ci) => (
                                                ci.Impact ? (
                                                    <div key={ci.id_checklist_impacts} className="profile-impact-item"> {/* Élément impact mis à jour */}
                                                        <p>{ci.Impact.impact}</p>
                                                        <small>
                                                            Importance : <strong>{ci.Impact.importance}</strong>
                                                        </small>
                                                    </div>
                                                ) : (
                                                    <p key={ci.id_checklist_impacts} className="no-impact">Données d'impact manquantes.</p>
                                                )
                                            ))
                                        ) : (
                                            <p className="no-impacts">Aucun impact dans cette checklist.</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-checklists-message">Aucune checklist disponible.</p>
                    )}
                </>
            )}
        </div>
    );
    
};

export default Profil;
