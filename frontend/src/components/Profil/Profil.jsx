import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserChecklists } from "../../services/api";
import { useAuth } from "../../providers/AuthProvider";


const thematiques = [
    { value: 1, label: "Techniques de mise en œuvre" },
    { value: 2, label: "Durabilité / Construction durable / Circularité / Environnement" },
    { value: 3, label: "Performance thermique / Energie / Isolation / Confort" },
    { value: 4, label: "Etanchéité à l'air, à l'eau, à la vapeur d'eau" },
    { value: 5, label: "Acoustique (petites copropriétés)" },
    { value: 6, label: "Stabilité" },
    { value: 7, label: "Pathologies" },
    { value: 8, label: "Patrimoine / Restauration" },
];

const Profil = () => {
    const { utilisateur } = useAuth();
    const [checklists, setChecklists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    

    const handleViewChecklist = (id) => {
        navigate(`/checklists/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (utilisateur?.id_utilisateur) {
                    const checklistData = await fetchUserChecklists(utilisateur.id_utilisateur);

                    // Créer un mappage ID -> Nom pour les thématiques
                    const thematiqueMap = Object.fromEntries(
                        thematiques.map(({ value, label }) => [value, label])
                    );

                    // Ajouter les noms des thématiques à chaque checklist
                    const transformedData = checklistData.map((checklist) => ({
                        ...checklist,
                        thematiques: Array.from(
                            new Set(
                                checklist.ChecklistImpacts.map(
                                    (ci) => thematiqueMap[ci.Impact?.thematique]
                                )
                            )
                        ).filter(Boolean), // Supprimer les valeurs nulles
                    }));

                    setChecklists(transformedData);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [utilisateur]);

    return (
        <>
 <div className="checklist-card-container">
    <h4 className="impact-card-title">Votre Profil</h4>
    <div className="impact-card-underline"></div>

    {!utilisateur ? (
        <p className="text-muted">Veuillez vous connecter pour voir vos checklists.</p>
    ) : loading ? (
        <p className="text-muted">Chargement des checklists...</p>
    ) : checklists.length > 0 ? (
        checklists.map((checklist) => (
            <div key={checklist.id_checklist} className="checklist-card">
                <h4 className="checklist-card-title">
                    {checklist.nom_checklist || "Checklist sans nom"}
                </h4>
                <p className="checklist-card-date">
                    Créée le : {new Date(checklist.date_creation).toLocaleDateString("fr-FR")}
                </p>

                <div className="checklist-thematiques">
                    <h6 className="thematiques-title">Thématiques :</h6>
                    {checklist.thematiques.length > 0 ? (
                        checklist.thematiques.map((thematique, index) => (
                            <p key={index} className="checklist-thematique-item"><i>{thematique}</i></p>
                        ))
                    ) : (
                        <p className="text-muted">Aucune thématique disponible.</p>
                    )}
                </div>
                <button
            className="checklist-card-btn"
            onClick={() => handleViewChecklist(checklist.id_checklist)}
        >
                    Voir les détails
                </button>
            </div>
        ))
    ) : (
        <p className="text-muted">Aucune checklist disponible.</p>
    )}
</div>

        </>
    );
};

export default Profil;
