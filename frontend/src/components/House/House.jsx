import React, { useState } from "react";

const House = ({ onComposanteSelect }) => {
    // Liste des composantes avec IDs et noms
    const composantes = [
        { id: 1, nom: 'Façades', positionClass: 'facades-murs' },
        { id: 2, nom: 'Charpente - Toiture', positionClass: 'charpente-toiture' },
        { id: 3, nom: 'Murs mitoyens', positionClass: 'murs-mitoyens' },
        { id: 4, nom: 'Murs porteurs intérieurs', positionClass: 'murs-porteurs' },
        { id: 5, nom: 'Planchers', positionClass: 'dalles-planchers' },
        { id: 6, nom: 'Escaliers', positionClass: 'escaliers' },
        { id: 7, nom: 'Menuiseries extérieures', positionClass: 'menuiseries-exterieures' },
        { id: 8, nom: 'Menuiseries intérieures', positionClass: 'menuiseries-interieures' },
        { id: 9, nom: 'Cloisons', positionClass: 'cloisons' },
        { id: 10, nom: 'Revêtements de sol', positionClass: 'revetements-sol' },
        { id: 11, nom: 'Revêtements muraux', positionClass: 'revetements-muraux' },
        { id: 12, nom: 'Plomberie', positionClass: 'plomberie' },
        { id: 13, nom: 'Electricité', positionClass: 'electricite' },
        { id: 14, nom: 'HVAC', positionClass: 'hvac' },
    ];
    

    // État pour gérer la composante sélectionnée
    const [selectedComposanteId, setSelectedComposanteId] = useState(null);

    // Gestion de la sélection/désélection
    const handleComposanteClick = (composanteId) => {
        const newSelection = selectedComposanteId === composanteId ? null : composanteId;
        setSelectedComposanteId(newSelection);
        if (onComposanteSelect) {
            onComposanteSelect(newSelection); // Envoie l'ID (ou null) au parent
        }
    };

    return (
        <div className="house-container">
            <img src="/images/maison_bruxelloise.png" alt="Maison" className="house-image" />
            {/* Annotations interactives */}
            {composantes.map((composante) => (
                <div
                    key={composante.id}
                    className={`annotation ${composante.positionClass} ${
                        selectedComposanteId === composante.id ? 'active' : ''
                    }`}
                    onClick={() => handleComposanteClick(composante.id)}
                    style={{ cursor: "pointer" }}
                >
                    {composante.nom}
                </div>
            ))}
        </div>
    );
};

export default House;
