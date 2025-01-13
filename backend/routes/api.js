import express from 'express';
import Metier from '../models/Metier.js';
import Thematique from '../models/Thematique.js';
import Composante from '../models/Composante.js';
import Impact from '../models/Impact.js';
import Checklist from '../models/Checklist.js';
import ChecklistImpacts from '../models/ChecklistImpacts.js';
import { Op } from 'sequelize';
import e from 'express';

const router = express.Router();

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// Ajouter un nouvel impact
router.post('/impacts', async (req, res) => {
  try {
    const { impact, importance, metier, composante, thematique } = req.body;

    if (!impact || !importance || !metier || !composante || !thematique) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const newImpact = await Impact.create({ impact, importance, metier, composante, thematique });
    res.status(201).json(newImpact);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un impact :", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Récupérer tous les métiers
router.get('/metiers', async (req, res) => {
  try {
    const metiers = await Metier.findAll();
    res.json(metiers);
  } catch (error) {
    console.error('Erreur lors de la récupération des métiers :', error);
    res.status(500).json({ message: error.message });
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
    if (metierId) where.metier = metierId;
    if (composanteId) where.composante = composanteId;
    if (thematiqueIds) {
      where.thematique = {
        [Op.in]: thematiqueIds.split(',').map(Number),
      };
    }

    const impacts = await Impact.findAll({ where });
    res.json(impacts);
  } catch (error) {
    console.error('Erreur lors de la récupération des impacts :', error);
    res.status(500).json({ message: error.message });
  }
});

// Créer une nouvelle checklist
router.post('/checklists', async (req, res) => {
  try {
    const { utilisateur, nom_checklist, impacts } = req.body;

    if (!utilisateur || !nom_checklist || !impacts || impacts.length === 0) {
      return res.status(400).json({ message: 'Utilisateur, nom de checklist et impacts sont requis.' });
    }

    // Crée la checklist
    const newChecklist = await Checklist.create({ utilisateur, nom_checklist });

    // Ajoute les impacts à la checklist
    const checklistImpacts = impacts.map((impactId) => ({
      checklist: newChecklist.id_checklist,
      impact: impactId,
    }));
    await ChecklistImpacts.bulkCreate(checklistImpacts);

    res.status(201).json({ message: 'Checklist créée avec succès.', checklist: newChecklist });
  } catch (error) {
    console.error('Erreur lors de la création de la checklist :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Récupérer toutes les checklists d'un utilisateur
router.get('/checklists', async (req, res) => {
  try {
    const { utilisateurId } = req.query;

    if (!utilisateurId) {
      return res.status(400).json({ message: 'ID utilisateur requis.' });
    }

    const checklists = await Checklist.findAll({
      where: { utilisateur: utilisateurId },
      include: [
        {
          model: ChecklistImpacts,
          include: [Impact],
        },
      ],
    });

    res.json(checklists);
  } catch (error) {
    console.error('Erreur lors de la récupération des checklists :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

export default router;
