import React, { useState, useEffect } from 'react';
import Thematiques from '../Thematiques/Thematiques';
import Metiers from '../Metiers/Metiers';
import House from '../House/House';
import ImpactsTable from '../ImpactsTable/ImpactsTable';
import { fetchImpacts } from '../../services/api';

const Home = () => {
    const [selectedThematiqueIds, setSelectedThematiqueIds] = useState([]);
    const [selectedMetierId, setSelectedMetierId] = useState(null);
    const [selectedComposanteId, setSelectedComposanteId] = useState(null);
    const [allImpacts, setAllImpacts] = useState([]);
    const [filteredImpacts, setFilteredImpacts] = useState({});
    const [loading, setLoading] = useState(false);

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
                        <ImpactsTable groupedImpacts={filteredImpacts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
