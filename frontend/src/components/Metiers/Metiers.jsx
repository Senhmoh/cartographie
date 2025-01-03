import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Metiers = ({ onMetierSelect }) => {
    // Liste des métiers avec des IDs
    const metiers = [
        { id: 1, nom: "Démolisseur et déconstructeur" },
        { id: 2, nom: "Maçon / Façadier" },
        { id: 3, nom: "Charpentier / Monteur ossature en bois" },
        { id: 4, nom: "Couvreur / aide en couverture / Toiturier / Etancheur (toiture plate)" },
        { id: 5, nom: "Chauffagiste / HVAC / Ventiliste / Plombier / Poseur de canalisations et d'égoûts / Sanitariste" },
        { id: 6, nom: "Électricien / Installateur de panneaux solaires / Spécialiste en domotique" },
        { id: 7, nom: "Carreleur / Chapiste" },
        { id: 8, nom: "Menuisier / Aide en menuiserie / Installateur de cloisons et faux-plafonds / Placeur de châssis" },
        { id: 9, nom: "Plafonneur / Plâtrier / Enduiseur" },
    ];

    const [selectedMetier, setSelectedMetier] = useState('Métiers');

    // Gestion de la sélection
    const handleSelect = (metier) => {
        setSelectedMetier(metier.nom); // Afficher le nom sélectionné
        if (onMetierSelect) {
            onMetierSelect(metier.id); // Passer l'ID au parent
        }
    };

    return (
        <DropdownButton
            title={selectedMetier}
            variant="outline-secondary"
            className="w-100 text-center my-2"
        >
            {metiers.map((metier) => (
                <Dropdown.Item
                    key={metier.id}
                    onClick={() => handleSelect(metier)}
                >
                    {metier.nom}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default Metiers;
