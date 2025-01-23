import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';
import './models/Associations.js';
import './config/passport.js';
import { cleanExpiredTokens } from './routes/auth.js';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { fileURLToPath } from 'url';

// Configurer __dirname pour ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialiser Redis
const RedisStore = connectRedis(session);
const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

// Initialiser dotenv
dotenv.config();

// Initialiser Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Configuration des sessions
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
    },
}));

// Initialisation de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configuration CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://cartographie-flax.vercel.app', 'https://renov-impact.be'],
    credentials: true,
}));

// Routes API
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Servir les fichiers statiques (React)
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Nettoyage des tokens expirés au démarrage
try {
    cleanExpiredTokens();
} catch (err) {
    console.error('Erreur lors du nettoyage des tokens expirés :', err);
}

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
