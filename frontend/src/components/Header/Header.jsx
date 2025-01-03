import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#ebe6e1" }} className="py-2">
            <Container className="d-flex align-items-center">
                {/* Logo avec lien vers l'accueil */}
                <Navbar.Brand as={Link} to="/" className="me-auto">
                <img
src="/images/Renov’IMPACT (400 x 500 px) (400 x 300 px) (600 x 300 px).svg"
alt="Renov'IMPACT Logo"
className="img-fluid"
style={{
    maxHeight: '60px', // Taille légèrement agrandie
    width: 'auto', // Maintient les proportions
}}
/>
                </Navbar.Brand>
                
                {/* Boutons */}
                <div className="d-flex button-group">
                    <Link to="/login" className="btn custom-btn custom-btn-green">
                        <i className="bi bi-person"></i>
                    </Link>
                    <button className="btn custom-btn custom-btn-gray-filled">FR</button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;


