import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home'; // La page principale
import Login from '../Login/Login'; // La page de connexion

function App() {
  return (
    <Router>
      <div className="app-container">
      <div className="gradient-section"></div>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Page d'accueil */}
            <Route path="/login" element={<Login />} /> {/* Page Login */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
