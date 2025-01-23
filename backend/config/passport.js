import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Utilisateur from '../models/Utilisateur.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET est manquant dans les variables d\'environnement');
}

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies.accessToken,
        ExtractJwt.fromAuthHeaderAsBearerToken()
    ]),
    
    secretOrKey: process.env.JWT_SECRET, // Clé secrète pour signer et vérifier les tokens
};

// Définir la stratégie
passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            // Vérifier si l'utilisateur existe dans la base
            const utilisateur = await Utilisateur.findByPk(payload.id);
            if (utilisateur) {
                return done(null, utilisateur); // Authentification réussie
            }
            return done(null, false, { message: 'Authentification échouée : utilisateur non trouvé ou token invalide' });
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
