import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const Header = () => {
    const { utilisateur, logout } = useAuth();
    console.log(utilisateur);

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#ebe6e1" }} className="py-2">
            <Container className="d-flex align-items-center">
                {/* Logo avec lien vers l'accueil ebe6e1*/}
                <Navbar.Brand as={Link} to="/" className="me-auto">
                    <img
                        src="/images/logo.svg"
                        alt="Renov'IMPACT Logo"
                        className="img-fluid"
                        style={{
                            maxHeight: '80px',
                            width: 'auto',
                        }}
                    />
                </Navbar.Brand>
                
                {/* Boutons */}
                <div className="d-flex button-group">
                    {utilisateur ? (
                        <>
                            <span className="me-3">
                                Bienvenue, {utilisateur.nom_utilisateur || 'Utilisateur'}!
                            </span>
                            <button
                                onClick={logout}
                                className="btn custom-btn custom-btn-green"
                                title="Déconnexion"
                            >
                                <i className="bi bi-box-arrow-right"></i>
                            </button>
                            <Link 
                            to="/profil" 
                            className="btn custom-btn custom-btn-green" 
                            title="Profil"
                        >
                            <i class="bi bi-list-check"></i>
                        </Link>
                        </>
                    ) : (
                        <Link 
                            to="/login" 
                            className="btn custom-btn custom-btn-green" 
                            title="Connexion"
                        >
                            <i className="bi bi-person"></i>
                        </Link>
                    )}
                    <button 
                        className="btn custom-btn custom-btn-gray-filled"
                        title="Changer la langue"
                    >
                        FR
                    </button>
                </div>
            </Container>
        </Navbar>
    );
    
};

export default Header;

