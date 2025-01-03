import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjoutImpact = () => {
    const [metiers, setMetiers] = useState([]);
    const [thematiques, setThematiques] = useState([]);
    const [composantes, setComposantes] = useState([]);
    const [formData, setFormData] = useState({
        impact: '',
        importance: 1,
        metier: '',
        composante: '',
        thematique: ''
    });

    // Charger les données des menus déroulants
    useEffect(() => {
        // Données statiques à utiliser pour les listes
        setMetiers([
            { id: 1, nom: 'Démolisseur et déconstructeur' },
            { id: 2, nom: 'Maçon / Façadier' },
            { id: 3, nom: 'Charpentier / Monteur ossature en bois' },
            { id: 4, nom: 'Couvreur / aide en couverture / Toiturier / Etancheur (toiture plate)' },
            { id: 5, nom: 'Chauffagiste / HVAC / Ventiliste / Plombier / Poseur de canalisations et d\'égoûts / Sanitariste' },
            { id: 6, nom: 'Électricien / Installateur de panneaux solaires / Spécialiste en domotique' },
            { id: 7, nom: 'Carreleur / Chapiste' },
            { id: 8, nom: 'Menuisier / Aide en menuiserie / Installateur de cloisons et faux-plafonds / Placeur de châssis' },
            { id: 9, nom: 'Plafonneur / Plâtrier / Enduiseur' },
        ]);

        setThematiques([
            { id: 1, nom: 'Techniques de mise en œuvre' },
            { id: 2, nom: 'Durabilité / Construction durable / Circularité / Environnement' },
            { id: 3, nom: 'Performance thermique / Energie / Isolation / Confort' },
            { id: 4, nom: 'Etanchéité à l\'air, à l\'eau, à la vapeur d\'eau' },
            { id: 5, nom: 'Acoustique (petites copropriétés)' },
            { id: 6, nom: 'Stabilité' },
            { id: 7, nom: 'Pathologies' },
            { id: 8, nom: 'Patrimoine / Restauration' },
        ]);

        setComposantes([
            { id: 1, nom: 'Façades' },
            { id: 2, nom: 'Charpente - Toiture' },
            { id: 3, nom: 'Murs mitoyens' },
            { id: 4, nom: 'Murs porteurs intérieurs' },
            { id: 5, nom: 'Dalles - Planchers' },
            { id: 6, nom: 'Escaliers' },
        ]);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/impacts', formData);
            alert("Impact ajouté avec succès !");
            setFormData({
                impact: '',
                importance: 1,
                metier: '',
                composante: '',
                thematique: ''
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'impact :", error);
            alert("Une erreur est survenue lors de l'ajout.");
        }
    };

    return (
        <div className="container">
            <h2>Ajouter un Impact</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Métier</label>
                    <select
                        name="metier"
                        value={formData.metier}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Sélectionnez un métier</option>
                        {metiers.map((metier) => (
                            <option key={metier.id} value={metier.id}>
                                {metier.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Thématique</label>
                    <select
                        name="thematique"
                        value={formData.thematique}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Sélectionnez une thématique</option>
                        {thematiques.map((thematique) => (
                            <option key={thematique.id} value={thematique.id}>
                                {thematique.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Composante</label>
                    <select
                        name="composante"
                        value={formData.composante}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Sélectionnez une composante</option>
                        {composantes.map((composante) => (
                            <option key={composante.id} value={composante.id}>
                                {composante.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Importance</label>
                    <select
                        name="importance"
                        value={formData.importance}
                        onChange={handleChange}
                        className="form-control"
                    >
                        {[1, 2, 3].map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Impact</label>
                    <textarea
                        name="impact"
                        value={formData.impact}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="Décrivez l'impact..."
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Ajouter l'impact
                </button>
            </form>
        </div>
    );
};

export default AjoutImpact;
