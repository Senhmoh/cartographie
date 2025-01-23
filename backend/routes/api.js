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

router.post('/checklists', async (req, res) => {
  try {
      const { utilisateur, nom_checklist, impacts } = req.body;

      if (!utilisateur || !nom_checklist || !impacts || impacts.length === 0) {
          return res.status(400).json({ message: 'Utilisateur, nom de checklist et impacts sont requis.' });
      }

      // Récupérer les impacts pour vérifier les contraintes
      const impactsData = await Impact.findAll({
          where: { id_impact: impacts },
      });

      const uniqueComposantes = new Set(impactsData.map((i) => i.composante));
      const uniqueMetiers = new Set(impactsData.map((i) => i.metier));

      if (uniqueComposantes.size > 1 || uniqueMetiers.size > 1) {
          return res.status(400).json({
              message:
                  "Les impacts doivent avoir la même composante et le même métier pour être ajoutés à une checklist.",
          });
      }

      // Créer la checklist
      const newChecklist = await Checklist.create({ utilisateur, nom_checklist });

      // Lier les impacts à la checklist
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
router.get('/checklists/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Récupération de la checklist avec ses impacts et thématiques associées
      const checklist = await Checklist.findOne({
          where: { id_checklist: id },
          include: [
              {
                  model: ChecklistImpacts,
                  attributes: ["id_checklist_impacts", "statut"],
                  include: [
                      {
                          model: Impact,
                          attributes: ["id_impact", "impact", "importance"],
                          include: [
                              {
                                  model: Thematique,
                                  attributes: ["nom_thematique"], // Correction ici
                              },
                          ],
                      },
                  ],
              },
          ],
      });

      if (!checklist) {
          return res.status(404).json({ message: "Checklist introuvable." });
      }

      // Construire la réponse avec les impacts et leurs thématiques
      const impacts = checklist.ChecklistImpacts.map((ci) => ({
          id_checklist_impacts: ci.id_checklist_impacts, // Ajout de l'identifiant
          id_impact: ci.Impact.id_impact,
          impact: ci.Impact.impact,
          importance: ci.Impact.importance,
          thematique_nom: ci.Impact.Thematique?.nom_thematique || null,
          statut: ci.statut, // Inclure le statut
      }));

      res.json({
          nom_checklist: checklist.nom_checklist,
          impacts,
      });
  } catch (error) {
      console.error("Erreur lors de la récupération de la checklist :", error.message, error.stack);
      res.status(500).json({
          message: "Erreur interne du serveur.",
          details: error.message,
      });
  }
});


router.put('/checklists/:id/title', async (req, res) => {
  const { id } = req.params;
  const { nom_checklist } = req.body;

  if (!nom_checklist) {
    console.error("Erreur : le titre est manquant.");
    return res.status(400).json({ message: "Le titre de la checklist est requis." });
  }

  try {
    const checklist = await Checklist.findByPk(id);

    if (!checklist) {
      console.error("Erreur : checklist introuvable pour l'ID :", id);
      return res.status(404).json({ message: "Checklist introuvable." });
    }

    checklist.nom_checklist = nom_checklist;
    await checklist.save();

    res.json({ message: "Titre mis à jour avec succès.", checklist });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du titre :", error.message, error.stack);
    res.status(500).json({ message: "Erreur interne du serveur.", details: error.message });
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


router.put('/checklist-impacts/:id/statut', async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  if (!['Non commencé', 'Planifié', 'En attente', 'En cours', 'Suspendu', 'Terminé'].includes(statut)) {
    return res.status(400).json({ message: 'Statut invalide.' });
  }

  try {
    const checklistImpact = await ChecklistImpacts.findByPk(id);

    if (!checklistImpact) {
      return res.status(404).json({ message: 'Relation checklist-impact introuvable.' });
    }

    checklistImpact.statut = statut;
    await checklistImpact.save();

    res.json({ message: 'Statut mis à jour avec succès.', checklistImpact });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});




export default router;
