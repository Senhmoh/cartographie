import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Thematiques from '../Thematiques/Thematiques';
import Metiers from '../Metiers/Metiers';
import House from '../House/House';
import ImpactsTable from '../ImpactsTable/ImpactsTable';

const Home = () => {
    const [selectedThematiqueIds, setSelectedThematiqueIds] = useState([[]]);
    const [selectedMetierId, setSelectedMetierId] = useState(null);
    const [selectedComposanteId, setSelectedComposanteId] = useState(null);

    const metiers = [
        { id: 1, nom: 'Maçon/Facadier' },
        { id: 2, nom: 'Menuisier' },
    ];

    const thematiques = [
        { id: 1, nom: 'Stabilité' },
        { id: 2, nom: 'Durabilité & Circularité' },
    ];

    const composantes = [
        { id: 1, nom: 'Façades - Murs extérieurs' },
        { id: 2, nom: 'Charpente - Toiture' },
    ];

    const impacts = [
        {
            metierId: 1,
            thematiqueId: 1,
            composanteId: 1,
            descriptions : [
                'Vérifier les éventuelles fissures…',               
                'Vérifier la résistance si modification des charges ou percement des baies'
            ]
        },
        {
            metierId: 2,
            thematiqueId: 2,
            composanteId: 2,
            descriptions : [
                'Opter pour des matériaux durables (de réemploi) et à faible impact environnemental',
                'Prévoir des connexions accessibles et réversibles pour les éléments de cloisonnement, faux-plafond et faux-plancher'
            ]
        }
    ];

    const getImpacts = () => {
      return impacts.filter(
          (impact) =>
              selectedThematiqueIds.includes(impact.thematiqueId) &&
              (!selectedMetierId || impact.metierId === selectedMetierId) &&
              (!selectedComposanteId || impact.composanteId === selectedComposanteId)
      );
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
                  <ImpactsTable impacts={getImpacts()} />
              </div>
          </div>
      </div>
  );
};

export default Home;
