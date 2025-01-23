import React from 'react';
import Select from 'react-select';

// Liste des métiers
const metiers = [
    { value: 1, label: "Démolisseur et déconstructeur" },
    { value: 2, label: "Maçon / Façadier" },
    { value: 3, label: "Charpentier / Monteur ossature en bois" },
    { value: 4, label: "Couvreur / aide en couverture / Toiturier / Étancheur (toiture plate)" },
    { value: 5, label: "Chauffagiste / HVAC / Ventiliste / Plombier / Poseur de canalisations et d'égouts / Sanitariste" },
    { value: 6, label: "Électricien / Installateur de panneaux solaires / Spécialiste en domotique" },
    { value: 7, label: "Carreleur / Chapiste" },
    { value: 8, label: "Menuisier / Aide en menuiserie / Installateur de cloisons et faux-plafonds / Placeur de châssis" },
    { value: 9, label: "Plafonneur / Plâtrier / Enduiseur" },
];

const Metiers = ({ onMetierSelect }) => {
    const handleChange = (selectedOption) => {
        // Récupère l'ID du métier sélectionné
        const selectedId = selectedOption ? selectedOption.value : null;
        onMetierSelect(selectedId); // Passe l'ID sélectionné au parent
    };

    return (
        <div className="metiers-container">
            <Select
                options={metiers} // Liste des options
                placeholder="Sélectionnez un métier..."
                onChange={handleChange} // Appelle handleChange à chaque changement
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable // Permet de réinitialiser la sélection
            />
        </div>
    );
};

export default Metiers;
