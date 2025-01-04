import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});


console.log('Début du test Sequelize');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données Railway');
  } catch (error) {
    console.error('Erreur de connexion Sequelize :', error.message);
  } finally {
    console.log('Fin du test Sequelize');
  }
})();

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