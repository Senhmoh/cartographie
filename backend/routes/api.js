import express from 'express';
import Metier from '../models/Metier.js';
import Thematique from '../models/Thematique.js';
import Composante from '../models/Composante.js';
import Impact from '../models/Impact.js';

const router = express.Router();

// Ajouter un nouvel impact
router.post('/impacts', async (req, res) => {
  try {
    const { impact, importance, metier, composante, thematique } = req.body;

    // Validation des champs
    if (!impact || !importance || !metier || !composante || !thematique) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Création de l'impact
    const newImpact = await Impact.create({
      impact,
      importance,
      metier,
      composante,
      thematique,
    });

    res.status(201).json(newImpact);
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un impact :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Récupérer tous les métiers
router.get('/metiers', async (req, res) => {
  console.log("Route '/metiers' appelée");
  try {
    const metiers = await Metier.findAll();
    console.log('Données récupérées pour /metiers :', metiers); // Log des données récupérées
    res.json(metiers); // Envoi des données au navigateur
  } catch (error) {
    console.error('Erreur lors de la récupération des métiers :', error); // Log des erreurs
    res.status(500).json({ message: error.message }); // Envoi d'une réponse d'erreur
  }
});


// Récupérer toutes les thématiques
router.get('/thematiques', async (req, res) => {
  try {
    const thematiques = await Thematique.findAll();
    res.json(thematiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer toutes les composantes
router.get('/composantes', async (req, res) => {
  try {
    const composantes = await Composante.findAll();
    res.json(composantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer les impacts avec filtres
router.get('/impacts', async (req, res) => {
  try {
    const { metierId, thematiqueIds, composanteId } = req.query;
    
    const where = {};
    if (metierId) where.metierId = metierId;
    if (composanteId) where.composanteId = composanteId;
    if (thematiqueIds) {
      where.thematiqueId = {
        [Op.in]: thematiqueIds.split(',').map(Number)
      };
    }

    const impacts = await Impact.findAll({ where });
    res.json(impacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;