import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home'; // La page principale
import Login from '../Login/Login'; // La page de connexion
import Ajout from '../Ajout/Ajout'; // La page d'ajout d'impact
import Inscription from '../Inscription/Inscription';
import Profil from '../Profil/Profil';
import { AuthProvider } from '../../providers/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <div className="gradient-section"></div>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Page d'accueil */}
              <Route path="/login" element={<Login />} /> {/* Page Login */}
              <Route path="/inscription" element={<Inscription />} /> {/* Page Inscription */}
              <Route path="/ajout" element={<Ajout />} /> {/* Page Ajout */}
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
