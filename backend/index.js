import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport'; // Import de Passport.js
import session from 'express-session'; // Middleware de session pour Passport
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';
import './models/Associations.js'; // Charge les associations avant toute utilisation des modèles
import './config/passport.js'; // Fichier de configuration de Passport
import { cleanExpiredTokens } from './routes/auth.js';

// Nettoyage des tokens expirés au démarrage
dotenv.config();

console.log('Début du test Sequelize');

sequelize.authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données Railway');
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion à la base de données :', err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

try {
  cleanExpiredTokens();
} catch (err) {
  console.error('Erreur lors du nettoyage des tokens expirés :', err);
}

// Middleware pour les cookies
app.use(cookieParser());

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET, // Utilisez une valeur secrète définie dans vos variables d'environnement
    resave: false, // Empêche la session d'être enregistrée si aucune modification n'est effectuée
    saveUninitialized: false, // N'enregistre pas de session vide
    cookie: {
        httpOnly: true, // Empêche l'accès via JavaScript
        secure: process.env.NODE_ENV === 'production', // Seulement HTTPS en production
        sameSite: 'none', // Empêche l'envoi de cookies à partir d'autres sites
    },
}));

// Initialisation de Passport.js
app.use(passport.initialize());
app.use(passport.session()); // Nécessaire si vous utilisez des sessions avec Passport

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://cartographie-flax.vercel.app', 'https://renov-impact.be'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  console.log('Cookies reçus :', req.cookies);
  next();
});

app.use(cors({
  origin: (origin, callback) => {
    console.log('Requête provenant de :', origin);
    callback(null, true);
  },
  credentials: true,
}));


app.use((req, res, next) => {
  console.log('Session utilisateur :', req.session);
  console.log('Utilisateur Passport :', req.user);
  next();
});


// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// Routes API
app.options('*', cors()); // Gère toutes les requêtes OPTIONS
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
