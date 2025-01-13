import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const Header = () => {
    const { utilisateur, logout } = useAuth();
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expand="lg" className="navbar-custom sticky-navbar py-2" expanded={expanded}>
            <Container>
                {/* Logo avec lien vers l'accueil */}
                <Navbar.Brand as={Link} to="/" className="logo-container">
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
                    onClick={() => setExpanded(!expanded)}
                >
                    <i className="bi bi-list"></i>
                </Navbar.Toggle>

                {/* Contenu du menu */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {utilisateur ? (
                            <>
                                <Nav.Link as={Link} to="/profil" className="nav-link-custom">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {utilisateur.nom_utilisateur || 'Profil'}
                                </Nav.Link>
                                <Nav.Link
                                    onClick={logout}
                                    className="nav-link-custom"
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="nav-link-custom">
                                <i className="bi bi-person me-2"></i>Connexion
                            </Nav.Link>
                        )}
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
