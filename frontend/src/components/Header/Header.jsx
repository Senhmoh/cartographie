import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: "#ebe6e1" }} className="py-2">
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
               {/* Boutons */}
<div className="d-flex button-group">
  <button className="btn custom-btn custom-btn-green">
    <i className="bi bi-person"></i>
  </button>
  <button className="btn custom-btn custom-btn-gray-filled">FR</button>
</div>

            </Container>
        </Navbar>
    );
};

export default Header;
