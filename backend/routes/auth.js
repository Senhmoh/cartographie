import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Utilisateur from '../models/Utilisateur.js';

const router = express.Router();

// Inscription
router.post('/inscription', [
    body('nom_utilisateur').notEmpty().withMessage('Le nom d\'utilisateur est requis.'),
    body('email').isEmail().withMessage('Un email valide est requis.'),
    body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nom_utilisateur, email, mot_de_passe } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
        if (utilisateurExistant) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Créer un nouvel utilisateur
        const nouvelUtilisateur = await Utilisateur.create({
            nom_utilisateur,
            email,
            mot_de_passe: hashedPassword,
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
        // Vérifier si l'utilisateur existe
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: utilisateur.id_utilisateur, nom_utilisateur: utilisateur.nom_utilisateur }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }

});

router.post('/api/auth/validate-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token valide', utilisateur: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré' });
    }
});


export default router;
