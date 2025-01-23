import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport'; // Import Passport.js
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Utilisateur from '../models/Utilisateur.js';
import RefreshToken from '../models/RefreshToken.js';
import { Op } from 'sequelize'; // Import Sequelize Operators


const router = express.Router();

// Durées des tokens
const ACCESS_TOKEN_EXPIRATION = '15m'; // Token court
const REFRESH_TOKEN_EXPIRATION = '7d'; // Token long

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Ou un autre service d'email
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Générer un token JWT
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

const generateRefreshToken = async (user) => {
    const token = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    // Enregistrer le token en base
    await RefreshToken.create({
        token,
        user_id: user.id, // Utilisez l'id de l'utilisateur du payload
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
    });

    return token;
};

export const cleanExpiredTokens = async () => {
    try {
        const result = await RefreshToken.destroy({
            where: {
                expires_at: { [Op.lt]: new Date() }, // Supprime les tokens expirés
            },
        });
    } catch (error) {
        console.error('Erreur lors du nettoyage des tokens expirés :', error.message);
    }
};

// Inscription
router.post('/inscription', [
    body('nom_utilisateur').notEmpty().withMessage("Le nom d'utilisateur est requis."),
    body('email').isEmail().withMessage('Un email valide est requis.'),
    body('mot_de_passe')
        .isLength({ min: 10 }).withMessage('Le mot de passe doit contenir au moins 10 caractères.')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule.')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre.')
    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nom_utilisateur, email, mot_de_passe, formation } = req.body;

    try {
        const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
        if (utilisateurExistant) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        await Utilisateur.create({
            nom_utilisateur,
            email,
            mot_de_passe: hashedPassword,
            formation
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Connexion
router.post('/connexion', [
    body('email').isEmail().withMessage('Un email valide est requis.'),
    body('mot_de_passe').notEmpty().withMessage('Le mot de passe est requis.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        const payload = {
            id: utilisateur.id_utilisateur,
            nom_utilisateur: utilisateur.nom_utilisateur,
            admin: utilisateur.admin,
        };

        await cleanExpiredTokens();

        const accessToken = generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);

        // Envoi des tokens dans des cookies sécurisés
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // none pour production, lax pour dev
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        console.log('Cookies définis :', res.getHeaders()['set-cookie']);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // none pour production, lax pour dev
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        });

        res.status(200).json({ message: 'Connexion réussie.' });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Rafraîchir le token
router.post('/refresh-token', async (req, res) => {
    await cleanExpiredTokens();
    const refreshToken = req.cookies.refreshToken; // Récupérer le refreshToken depuis les cookies

    if (!refreshToken) {
        console.error('Aucun refreshToken trouvé.');
        return res.status(403).json({ message: 'Refresh token manquant.' });
    }

    try {
        const tokenEntry = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!tokenEntry || tokenEntry.expires_at < new Date()) {
            console.error('Refresh token invalide ou expiré.');
            return res.status(403).json({ message: 'Refresh token invalide ou expiré.' });
        }

        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateAccessToken({ id: user.id, nom_utilisateur: user.nom_utilisateur });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // none pour production, lax pour dev
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        console.log('Cookies définis :', res.getHeaders()['set-cookie']);

        res.status(200).json({ message: 'Token rafraîchi avec succès.' });
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error);
        res.status(403).json({ message: 'Erreur lors du rafraîchissement du token.' });
    }
});


// Déconnexion
router.post('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        await RefreshToken.destroy({ where: { token: refreshToken } });
    }

    // Supprimer les cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Déconnecté avec succès.' });
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() }, // Token valide
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré.' });
        }

        // Hacher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe et réinitialiser le token
        user.mot_de_passe = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        res.status(500).json({ message: 'Erreur interne.' });
    }
});


// Récupérer les informations de l'utilisateur authentifié
router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Non authentifié' });
    }
    res.status(200).json(req.user);
});

// Route protégée exemple avec Passport.js
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: 'Accès autorisé.', user: req.user });
});

// Route pour générer un lien de réinitialisation
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Email non trouvé.' });
        }

        // Générer un token unique
        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 3600 * 1000); // 1 heure

        // Sauvegarder le token et l'expiration dans la base de données
        user.resetPasswordToken = token;
        user.resetPasswordExpires = expiration;
        await user.save();

        // Envoyer l'email avec le lien
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await transporter.sendMail({
            to: email,
            subject: 'Réinitialisation de mot de passe',
            html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
                   <a href="${resetLink}">${resetLink}</a>`,
        });

        res.status(200).json({ message: 'Email envoyé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).json({ message: 'Erreur interne.' });
    }
});

// Route pour tester et activer les cookies
router.get('/test-cookies', (req, res) => {
    res.cookie('testCookie', 'testValue', {
        httpOnly: true, // Empêche l'accès JavaScript
        secure: true, // Requiert HTTPS
        sameSite: 'none', // Nécessaire pour les requêtes cross-origin
        maxAge: 60 * 1000, // 1 minute
    });

    res.status(200).json({ message: 'Cookie défini avec succès.' });
    console.log('Cookies définis avec succès:', res.getHeaders()['set-cookie']);
});


export default router;
