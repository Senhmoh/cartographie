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
                            <span className="impact-meta"><strong>Métier ID :</strong> {impact.metier}</span>
                            <span className="impact-meta"><strong>Thématique ID :</strong> {impact.thematique}</span>
                            <span className="impact-meta"><strong>Composante ID :</strong> {impact.composante}</span>
                        </div>
                        <div className="impact-descriptions">
                            <div className="impact-item">
                                <span className="impact-icon">✔️</span>
                                <p>{impact.impact}</p>
                            </div>
                        </div>
                        <div className="impact-importance">
                            <strong>Importance :</strong> {impact.importance}
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
