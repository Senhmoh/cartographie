import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Thematiques = ({ onThematiqueSelect }) => {
    const thematiques = [
        'Énergie & Confort',
        'Étanchéité air-eau',
        'Acoustique',
        'Pathologies',
        'Durabilité & Circularité',
        'Stabilité',
        'Patrimoine',
    ];

    const [selectedThematique, setSelectedThematique] = useState('Thématiques');

    const handleSelect = (thematique) => {
        setSelectedThematique(thematique);
        if (onThematiqueSelect) {
            onThematiqueSelect(thematique);
        }
    };

    return (
        <DropdownButton
            title={selectedThematique}
            variant="outline-primary"
            className="w-100"
        >
            {thematiques.map((thematique, index) => (
                <Dropdown.Item key={index} onClick={() => handleSelect(thematique)}>
                    {thematique}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default Thematiques;
