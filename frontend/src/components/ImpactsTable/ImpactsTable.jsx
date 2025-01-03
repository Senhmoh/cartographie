import React from "react";

const ImpactsTable = ({ impacts }) => {
    return (
        <div className="impact-card-container">
            <h4 className="impact-card-title">Liste des impacts</h4>
            <div className="impact-card-line"></div>
            {impacts.length > 0 ? (
                impacts.map((impact, index) => (
                    <div key={index} className="impact-card">
                        <div className="impact-header">
                            <span className="impact-meta"><strong>Métier :</strong> {impact.metierId}</span>
                            <span className="impact-meta"><strong>Thématique :</strong> {impact.thematiqueId}</span>
                            <span className="impact-meta"><strong>Composante :</strong> {impact.composanteId}</span>
                        </div>
                        <div className="impact-descriptions">
                            {impact.descriptions.map((desc, idx) => (
                                <div key={idx} className="impact-item">
                                    <span className="impact-icon">✔️</span>
                                    <p>{desc}</p>
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
