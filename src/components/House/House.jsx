import React from 'react';

function House({ selected, onSelect }) {
    const components = [
        { name: 'Charpente - Toiture', top: '20%', left: '60%' },
        { name: 'Façades - Murs extérieurs', top: '40%', left: '30%' },
        { name: 'Murs mitoyens', top: '45%', left: '60%' },
        { name: 'Murs porteurs intérieurs', top: '55%', left: '50%' },
        { name: 'Dalles - Planchers', top: '90%', left: '40%' },
        { name: 'Escaliers', top: '85%', left: '50%' },
    ];

    return (
        <div className="house-container position-relative text-center my-4">
            {/* Image de la maison */}
            <img
                src="/images/image-removebg-preview.png"
                alt="Maison"
                className="house-image img-fluid mx-auto d-block"
            />

            {/* Annotations interactives */}
            {components.map((component, index) => (
                <div
                    key={index}
                    className={`annotation position-absolute ${
                        selected === component.name ? 'selected' : ''
                    }`}
                    style={{ top: component.top, left: component.left }}
                    onClick={() => {
                        const newSelected =
                            selected === component.name ? null : component.name;
                        onSelect(newSelected);
                    }}
                >
                    {component.name}
                </div>
            ))}
        </div>
    );
}

export default House;
