import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Ajout from '../Ajout/Ajout';
import Inscription from '../Inscription/Inscription';
import Profil from '../Profil/Profil';
import NotFoundPage from '../NotFoundPage/NotFoundPage'; // Page 404
import { AuthProvider, useAuth } from '../../providers/AuthProvider';
import ForgotPassword from '../Password/ForgotPassword';
import ChecklistDetails from '../Profil/ChecklistDetails';
import GDPRPage from '../GDPR/GdprPage';

// Composant pour protéger les routes
function ProtectedRoute({ children, requiredRole }) {
    const { isAuthenticated, utilisateur, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Chargement...</div>; // Indicateur de chargement
    }

    if (!isAuthenticated) {
        // Redirige vers la page de connexion et conserve l'emplacement d'origine
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && utilisateur?.role !== requiredRole) {
        // Redirige si l'utilisateur n'a pas le rôle requis
        return <Navigate to="/" replace />;
    }

    return children; // Rendu du contenu protégé
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <Header />
                    {/* Section principale qui remplit l'espace entre le header et le footer */}
                    <main className="main-content">
                        <Routes>
                            {/* Routes définies ici */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/inscription" element={<Inscription />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/privacy" element={<GDPRPage />} />
                            <Route
                                path="/ajout"
                                element={
                                    <ProtectedRoute>
                                        <Ajout />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profil"
                                element={
                                    <ProtectedRoute>
                                        <Profil />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute requiredRole="admin">
                                        <div>Page Admin</div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/checklists/:id"
                                element={
                                    <ProtectedRoute>
                                        <ChecklistDetails />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    {/* Footer toujours en bas */}
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}


export default App;
