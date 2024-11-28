import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Metiers = ({ onMetierSelect }) => {
    const metiers = ['Menuisier', 'Maçon', 'Plombier', 'Électricien', 'Charpentier'];

    const [selectedMetier, setSelectedMetier] = useState('Métiers');

    const handleSelect = (metier) => {
        setSelectedMetier(metier);
        if (onMetierSelect) {
            onMetierSelect(metier);
        }
    };

    return (
        <DropdownButton
            title={selectedMetier}
            variant="outline-primary"
            className="w-100 text-center my-2"
        >
            {metiers.map((metier, index) => (
                <Dropdown.Item
                    key={index}
                    onClick={() => handleSelect(metier)}
                >
                    {metier}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default Metiers;
