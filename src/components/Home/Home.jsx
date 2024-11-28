import React, { useEffect, useState } from 'react';
import House from '../House/House';
import Thematiques from '../Thematiques/Thematiques';
import Jobs from '../Jobs/Jobs';
import Impacts from '../Impacts/Impacts';

function Home() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedThematique, setSelectedThematique] = useState(null);

  useEffect(() => {
    console.log('Selected Job:', selectedJob);
    console.log('Selected Component:', selectedComponent);
    console.log('Selected Thematique:', selectedThematique);
  }, [selectedJob, selectedComponent, selectedThematique]);

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="content">
          <div className="sidebar left">
            <Thematiques
              selected={selectedThematique}
              onSelect={setSelectedThematique}
            />
          </div>
          <div className="center-content">
            <House
              selected={selectedComponent}
              onSelect={setSelectedComponent}
            />
          </div>
          <div className="sidebar right">
            <Jobs
              selected={selectedJob}
              onSelect={setSelectedJob}
            />
          </div>
        </div>
        <Impacts
          selectedJob={selectedJob}
          selectedComponent={selectedComponent}
          selectedThematique={selectedThematique}
        />
      </main>
    </div>
  );
}

export default Home;
