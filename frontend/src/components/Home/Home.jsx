import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Thematiques from '../Thematiques/Thematiques';
import Metiers from '../Metiers/Metiers';
import House from '../House/House';
import ImpactsTable from '../ImpactsTable/ImpactsTable';
import { fetchImpacts } from '../../services/api';

const Home = () => {
    const [selectedThematiqueIds, setSelectedThematiqueIds] = useState([]);
    const [selectedMetierId, setSelectedMetierId] = useState(null);
    const [selectedComposanteId, setSelectedComposanteId] = useState(null);
    const [allImpacts, setAllImpacts] = useState([]); // Tous les impacts récupérés
    const [filteredImpacts, setFilteredImpacts] = useState([]); // Impacts après filtrage
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Récupérer tous les impacts
                const data = await fetchImpacts();
                setAllImpacts(data); // Stocker tous les impacts
            } catch (error) {
                console.error("Erreur lors de la récupération des impacts :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Appliquer les filtres
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
            setFilteredImpacts(filtered);
        } else {
            setFilteredImpacts([]); // Réinitialiser si les filtres ne sont pas tous appliqués
        }
    }, [selectedThematiqueIds, selectedMetierId, selectedComposanteId, allImpacts]);

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center align-items-center my-3">
                    <div className="col-6 col-sm-5 col-md-4">
                        <Thematiques onThematiqueSelect={(ids) => setSelectedThematiqueIds(ids)} />
                    </div>
                    <div className="col-6 col-sm-5 col-md-4">
                        <Metiers onMetierSelect={(id) => setSelectedMetierId(id)} />
                    </div>
                </div>

                <House onComposanteSelect={(id) => setSelectedComposanteId(id)} />

                <div className="mt-4">
                    {loading ? (
                        <p>Chargement des impacts...</p>
                    ) : (
                        <ImpactsTable impacts={filteredImpacts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
