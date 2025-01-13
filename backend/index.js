import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';
import './models/Associations.js'; // Charge les associations avant toute utilisation des modèles

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

app.use(cors());
app.use(express.json());

// Routes API
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});