import React, { useState, useEffect } from 'react';
import Thematiques from '../Thematiques/Thematiques';
import Metiers from '../Metiers/Metiers';
import House from '../House/House';
import ImpactsTable from '../ImpactsTable/ImpactsTable';
import { fetchImpacts } from '../../services/api'; // Import des fonctions API

const Home = () => {
    const [selectedThematiqueIds, setSelectedThematiqueIds] = useState([]);
    const [selectedMetierId, setSelectedMetierId] = useState(null);
    const [selectedComposanteId, setSelectedComposanteId] = useState(null);
    const [allImpacts, setAllImpacts] = useState([]);
    const [filteredImpacts, setFilteredImpacts] = useState({});
    const [loading, setLoading] = useState(false);

    // Gestion des données d'impacts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchImpacts();
                setAllImpacts(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des impacts :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtrage des impacts selon les sélections
    useEffect(() => {
        if (
            selectedThematiqueIds.length > 0 &&
            selectedMetierId !== null &&
            selectedComposanteId !== null
        ) {
            const filtered = allImpacts.filter((impact) =>
                selectedThematiqueIds.includes(impact.thematique) &&
                impact.metier === selectedMetierId &&
                impact.composante === selectedComposanteId
            );

            const groupedImpacts = groupImpactsByThematique(filtered);
            setFilteredImpacts(groupedImpacts);
        } else {
            setFilteredImpacts({});
        }
    }, [selectedThematiqueIds, selectedMetierId, selectedComposanteId, allImpacts]);

    // Fonction pour regrouper les impacts par thématique
    const groupImpactsByThematique = (impacts) => {
        const grouped = {};
        impacts.forEach((impact) => {
            const thematiqueId = impact.thematique;
            if (!grouped[thematiqueId]) {
                grouped[thematiqueId] = [];
            }
            if (!grouped[thematiqueId].find((i) => i.id_impact === impact.id_impact)) {
                grouped[thematiqueId].push(impact);
            }
        });
        return grouped;
    };

    // Fonction pour gérer la soumission de la checklist
    const handleFillChecklist = async (selectedImpacts) => {
        try {
            const userId = 1; // Remplacez par la vraie ID utilisateur récupérée depuis le contexte ou l'authentification
            const checklistData = { utilisateur: userId, impacts: selectedImpacts };

            await saveChecklist(checklistData); // Appel API pour sauvegarder la checklist
            alert('Checklist enregistrée avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la checklist :', error);
            alert('Une erreur est survenue lors de la sauvegarde.');
        }
    };

    return (
        <div>
      <div className="home-banner">
    <div className="banner-content">
    <h1 className="banner-title">
    <span className="gradient-text">PROFESSIONNEL</span> DE LA CONSTRUCTION ?
</h1>

        <div className="banner-box">
            <p className="banner-text">
                Explorez les impacts des rénovations sur les différentes composantes d'une maison, 
                identifiez les thématiques clés liées à votre métier et découvrez comment optimiser 
                vos choix pour un avenir durable.
            </p>
        </div>
    </div>
</div>


            
            {/* Section avec container pour les filtres */}
            <div className="container">
            <div className="row justify-content-center align-items-start my-3">
    <div className="col-12 col-sm-6 col-md-4 mb-3">
        <Thematiques onThematiqueSelect={(ids) => setSelectedThematiqueIds(ids)} />
    </div>
    <div className="col-12 col-sm-6 col-md-4">
        <Metiers onMetierSelect={(id) => setSelectedMetierId(id)} />
    </div>
</div>

    
<div className="house-container-wrapper">
    <House onComposanteSelect={(id) => setSelectedComposanteId(id)} />
</div>
    
                <div className="mt-4">
                    {loading ? (
                        <p>Chargement des impacts...</p>
                    ) : (
                        <ImpactsTable
                            groupedImpacts={filteredImpacts}
                            onFillChecklist={handleFillChecklist}
                        />
                    )}
                </div>
            </div>
        </div>
    );    
    
};

export default Home;
