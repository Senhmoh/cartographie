import React from 'react';
import Select from 'react-select';

// Liste des thématiques
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

const Thematiques = ({ onThematiqueSelect }) => {
    const handleChange = (selectedOptions) => {
        // Récupère les IDs des thématiques sélectionnées
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        onThematiqueSelect(selectedIds); // Passe les IDs sélectionnés au parent
    };

    return (
        <div className="thematiques-container">
            <Select
                options={thematiques} // Liste des options
                isMulti // Active la sélection multiple
                placeholder="Sélectionnez une ou plusieurs thématiques..."
                onChange={handleChange} // Appelle handleChange à chaque changement
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default Thematiques;
