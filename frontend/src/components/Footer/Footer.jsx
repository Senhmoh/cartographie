import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer bg-dark text-white">
            <div className="container py-4">
                <div className="row">
                    {/* Colonne 1 */}
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <h5 className="footer-title">À propos</h5>
                        <p>
                            Construcity met en lumière l'impact des métiers de la construction
                            sur la rénovation durable.
                        </p>
                    </div>

                    {/* Colonne 2 */}
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                        <h5 className="footer-title">Liens rapides</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/about" className="footer-link">
                                    À propos
                                </a>
                            </li>
                            <li>
                    <p>
                <Link to="/privacy" className="auth-link">Politique de confidentialité</Link>
                    </p>
                            </li>
                            <li>
                                <a href="/terms" className="footer-link">
                                    Mentions légales
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 */}
                    <div className="col-md-4 text-center text-md-end">
                        <h5 className="footer-title">Suivez-nous</h5>
                        <div className="social-icons">
                            <a 
                                href="https://facebook.com" 
                                className="footer-icon" 
                                title="Facebook" 
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a 
                                href="https://instagram.com" 
                                className="footer-icon" 
                                title="Instagram" 
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                className="footer-icon" 
                                title="Twitter" 
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                className="footer-icon" 
                                title="LinkedIn" 
                                aria-label="LinkedIn"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Ligne de copyright */}
                <div className="text-center mt-3">
                    <p className="small">
                        &copy; 2025 Construcity. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
