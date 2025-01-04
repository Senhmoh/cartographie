import React from "react";

// Liste statique des thématiques
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

const ImpactsTable = ({ groupedImpacts }) => {
    // Fonction pour trouver le nom d'une thématique à partir de son ID
    const getThematiqueName = (id) => {
        const thematique = thematiquesList.find((item) => item.id === parseInt(id, 10));
        return thematique ? thematique.nom : "Thématique inconnue";
    };

    return (
        <div className="impact-card-container">
            <h4 className="impact-card-title">Liste des impacts par thématique</h4>
            <div className="impact-card-line"></div>
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
                                    <span className="impact-icon">✔️</span>
                                    <p>{impact.impact}</p>
                                    <small>
                                        <strong>Importance :</strong> {impact.importance}
                                    </small>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted">Aucun impact sélectionné.</p>
            )}
        </div>
    );
};

export default ImpactsTable;
