import React, { useState } from 'react';
import { Dropdown, DropdownButton, Badge } from 'react-bootstrap';

const Thematiques = ({ onThematiqueSelect }) => {
    const thematiques = [
        { id: 1, nom: 'Stabilité' },
        { id: 2, nom: 'Durabilité & Circularité' },
        { id: 3, nom: 'Énergie & Confort' },
        { id: 4, nom: 'Étanchéité air-eau' },
        { id: 5, nom: 'Acoustique' },
        { id: 6, nom: 'Pathologies' },
        { id: 7, nom: 'Patrimoine' },
    ];

    const [selectedThematiques, setSelectedThematiques] = useState([]);

    const handleSelect = (thematique) => {
        if (!selectedThematiques.some(t => t.id === thematique.id)) {
            const newSelection = [...selectedThematiques, thematique];
            setSelectedThematiques(newSelection);
            onThematiqueSelect(newSelection.map(t => t.id)); // Passe les IDs au parent
        }
    };

    const handleRemove = (id) => {
        const updatedThematiques = selectedThematiques.filter(t => t.id !== id);
        setSelectedThematiques(updatedThematiques);
        onThematiqueSelect(updatedThematiques.map(t => t.id)); // Met à jour au parent
    };

    return (
        <div>
            <DropdownButton
                title="Thématique"
                variant="outline-secondary"
                className="w-100 mb-2"
            >
                {thematiques
                    .filter(t => !selectedThematiques.some(sel => sel.id === t.id))
                    .map(thematique => (
                        <Dropdown.Item 
                            key={thematique.id}
                            onClick={() => handleSelect(thematique)}
                        >
                            {thematique.nom}
                        </Dropdown.Item>
                ))}
            </DropdownButton>

            <div>
                {selectedThematiques.map(thematique => (
                    <Badge 
                        key={thematique.id} 
                        bg="secondary" 
                        className="me-2 mb-2" 
                        onClick={() => handleRemove(thematique.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {thematique.nom} ✕
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default Thematiques;
