import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChecklist } from "../../services/api"; // Nouvelle fonction API
import "bootstrap-icons/font/bootstrap-icons.css"; // Assurez-vous que les icônes Bootstrap sont importées
import { useAuth } from "../../providers/AuthProvider";

const ImpactsTable = ({ groupedImpacts, onFillChecklist }) => {
    const [selectedImpacts, setSelectedImpacts] = useState([]);
    const navigate = useNavigate();
     const { utilisateur } = useAuth();

    const thematiquesList = [
        { id: 1, nom: "Techniques de mise en œuvre" },
        { id: 2, nom: "Durabilité / Construction durable / Circularité / Environnement" },
        { id: 3, nom: "Performance thermique / Energie / Isolation / Confort" },
        { id: 4, nom: "Etanchéité à l'air, à l'eau, à la vapeur d'eau" },
        { id: 5, nom: "Acoustique (petites copropriétés)" },
        { id: 6, nom: "Stabilité" },
        { id: 7, nom: "Pathologies" },
        { id: 8, nom: "Patrimoine / Restauration" },
    ];

    const getThematiqueName = (id) => {
        const thematique = thematiquesList.find((item) => item.id === parseInt(id, 10));
        return thematique ? thematique.nom : "Thématique inconnue";
    };

    const handleCheckboxChange = (impactId) => {
        setSelectedImpacts((prev) =>
            prev.includes(impactId)
                ? prev.filter((id) => id !== impactId)
                : [...prev, impactId]
        );
    };


    const handleFillChecklist = async () => {
        if (selectedImpacts.length === 0) {
            alert("Veuillez sélectionner au moins un impact.");
            return;
        }

        // Extraire les composantes et métiers des impacts sélectionnés
        const impactsData = Object.values(groupedImpacts).flat();
        const selectedImpactsData = impactsData.filter((impact) =>
            selectedImpacts.includes(impact.id_impact)
        );

        const uniqueComposantes = new Set(selectedImpactsData.map((i) => i.composante));
        const uniqueMetiers = new Set(selectedImpactsData.map((i) => i.metier));

        if (uniqueComposantes.size > 1 || uniqueMetiers.size > 1) {
            alert(
                "Les impacts doivent avoir la même composante et le même métier pour être ajoutés à une checklist."
            );
            return;
        }

        try {
            // Créer la checklist via l'API
            const newChecklist = await createChecklist({
                nom_checklist: "Nouvelle Checklist",
                utilisateur: utilisateur.id_utilisateur, // Remplacez par l'ID de l'utilisateur authentifié
                impacts: selectedImpacts,
            });

            navigate("/profil"); // Rediriger vers la page de profil
        } catch (error) {
            console.error("Erreur lors de la création de la checklist :", error);
            alert("Une erreur est survenue lors de la création de la checklist.");
        }
    };

    const renderStars = (importance) => {
        const fullStars = Array(importance).fill(<i className="bi bi-star-fill"></i>);
        const emptyStars = Array(3 - importance).fill(<i className="bi bi-star"></i>);
        return [...fullStars, ...emptyStars];
    };

    return (
        <div className="impact-card-container">
            <h4 className="impact-card-title">Liste des impacts</h4>
            <div className="impact-card-underline"></div>
            {Object.keys(groupedImpacts).length > 0 ? (
                Object.entries(groupedImpacts).map(([thematiqueId, impacts]) => (
                    <div key={thematiqueId} className="impact-card">
                        <div className="impact-header">
                            <span className="impact-meta">
                                <strong>Thématique :</strong> {getThematiqueName(thematiqueId)}
                            </span>
                        </div>
                        <div className="impact-descriptions">
                            {impacts.map((impact) => (
                                <div key={impact.id_impact} className="impact-item">
                                    <label className="impact-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="impact-checkbox"
                                            checked={selectedImpacts.includes(impact.id_impact)}
                                            onChange={() => handleCheckboxChange(impact.id_impact)}
                                        />
                                        <span className="impact-checkbox-custom"></span>
                                        <span
                                            className="impact-description"
                                            dangerouslySetInnerHTML={{ __html: impact.impact }}
                                        ></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="impact-importance">
                            <strong>Importance :</strong> {renderStars(impacts[0].importance)}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted">Aucun impact sélectionné.</p>
            )}

            {/* Bouton flottant */}
            {selectedImpacts.length > 0 && (
                <button
                    className="floating-checklist-btn"
                    onClick={handleFillChecklist}
                >
                    Checklist
                </button>
            )}
        </div>
    );
};

export default ImpactsTable;
