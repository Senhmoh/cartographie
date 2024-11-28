import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="py-2">
            <Container className="d-flex align-items-center">
                {/* Logo légèrement agrandi et aligné à gauche */}
                <Navbar.Brand href="#home" className="me-auto">
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
                {/* Boutons de langue */}
                <div className="d-flex">
                    <button className="btn btn-outline-primary me-2">FR</button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;
