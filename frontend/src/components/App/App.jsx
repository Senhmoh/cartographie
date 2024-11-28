import React from 'react';
import Header from '../Header/Header';
import Thematiques from '../Thematiques/Thematiques';
import Metiers from '../Metiers/Metiers';
import House from '../House/House';

const App = () => {
    const handleThematiqueSelect = (thematique) => {
        console.log('Thématique sélectionnée :', thematique);
    };

    const handleMetierSelect = (metier) => {
        console.log('Métier sélectionné :', metier);
    };

    return (
        <div>
            <Header />
            <div className="container">
                {/* Menus déroulants */}
                <div className="row justify-content-center align-items-center my-3">
                <div className="col-6 col-sm-5 col-md-4">
                        <Thematiques onThematiqueSelect={handleThematiqueSelect} />
                    </div>
                    {/* Menu Métiers */}
                    <div className="col-6 col-sm-5 col-md-4">
                        <Metiers onMetierSelect={handleMetierSelect} />
                    </div>
                </div>

                 {/* Maison */}
                 <House/>
            </div>
        </div>
    );
};

export default App;
