import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const Header = () => {
    const { utilisateur, logout, isAuthenticated, loading } = useAuth();
    const [expanded, setExpanded] = useState(false);

    // Gestion de l'expansion du menu
    const toggleNavbar = () => {
        setExpanded(!expanded);
    };

    const closeNavbar = () => {
        setExpanded(false);
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
    };

    // Masquer le header pendant le chargement de l'état d'authentification
    if (loading) {
        return null; // Rien n'est affiché tant que l'état d'authentification est en cours de vérification
    }

    return (
        <Navbar expand="lg" className="navbar-custom sticky-navbar py-2" expanded={expanded}>
            <Container>
                {/* Logo avec lien vers l'accueil */}
                <Navbar.Brand as={Link} to="/" className="logo-container" onClick={closeNavbar}>
                    <img
                        src="/images/logo.svg"
                        alt="Renov'IMPACT Logo"
                        className="logo-image"
                    />
                </Navbar.Brand>

                {/* Bouton toggle */}
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="custom-navbar-toggler"
                    onClick={toggleNavbar}
                >
                    <i className="bi bi-list"></i>
                </Navbar.Toggle>

                {/* Contenu du menu */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                {/* Lien vers le profil utilisateur */}
                                <Nav.Link as={Link} to="/profil" className="nav-link-custom" onClick={closeNavbar}>
                                    <i className="bi bi-person-circle me-2"></i>
                                    {utilisateur?.nom_utilisateur || 'Profil'}
                                </Nav.Link>

                                {/* Lien vers Ajout (uniquement pour admin) */}
                                {utilisateur?.admin && (
                                    <Nav.Link as={Link} to="/ajout" className="nav-link-custom" onClick={closeNavbar}>
                                        <i className="bi bi-plus-circle me-2"></i>Ajout
                                    </Nav.Link>
                                )}

                                {/* Bouton de déconnexion */}
                                <Nav.Link
                                    onClick={() => {
                                        handleLogout();
                                        closeNavbar();
                                    }}
                                    className="nav-link-custom"
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                {/* Lien vers la page de connexion */}
                                <Nav.Link as={Link} to="/login" className="nav-link-custom" onClick={closeNavbar}>
                                    <i className="bi bi-person me-2"></i>Connexion
                                </Nav.Link>
                                {/* Lien vers la page d'inscription */}
                                <Nav.Link as={Link} to="/inscription" className="nav-link-custom" onClick={closeNavbar}>
                                    <i className="bi bi-person-plus me-2"></i>Inscription
                                </Nav.Link>
                            </>
                        )}

                        {/* Option de changement de langue */}
                        <Nav.Link className="nav-link-custom" title="Changer la langue">
                            <i className="bi bi-translate me-2"></i>FR
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
