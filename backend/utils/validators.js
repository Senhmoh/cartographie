import { body, param, query } from 'express-validator';

export const validateImpactCreation = [
  body('impact')
    .notEmpty().withMessage('Le champ impact est obligatoire.')
    .isString().withMessage('Le champ impact doit être une chaîne de caractères.'),
  body('importance')
    .notEmpty().withMessage('Le champ importance est obligatoire.')
    .isInt({ min: 1, max: 3 }).withMessage('Le champ importance doit être un entier entre 1 et 3.'),
  body('metier')
    .notEmpty().withMessage('Le champ métier est obligatoire.')
    .isInt().withMessage('Le champ métier doit être un entier.'),
  body('composante')
    .notEmpty().withMessage('Le champ composante est obligatoire.')
    .isInt().withMessage('Le champ composante doit être un entier.'),
  body('thematique')
    .notEmpty().withMessage('Le champ thématique est obligatoire.')
    .isInt().withMessage('Le champ thématique doit être un entier.'),
];

export const validateImpactFilters = [
  query('metierId')
    .optional()
    .isInt().withMessage('Le champ metierId doit être un entier.'),
  query('composanteId')
    .optional()
    .isInt().withMessage('Le champ composanteId doit être un entier.'),
  query('thematiqueIds')
    .optional()
    .matches(/^\d+(,\d+)*$/).withMessage('Le champ thematiqueIds doit contenir des entiers séparés par des virgules.'),
];

export const validateChecklistCreation = [
  body('utilisateur')
    .notEmpty().withMessage('Le champ utilisateur est obligatoire.')
    .isInt().withMessage('Le champ utilisateur doit être un entier.'),
  body('nom_checklist')
    .notEmpty().withMessage('Le champ nom_checklist est obligatoire.')
    .isString().withMessage('Le champ nom_checklist doit être une chaîne de caractères.'),
  body('impacts')
    .isArray({ min: 1 }).withMessage('Le champ impacts doit être un tableau avec au moins un élément.'),
  body('impacts.*')
    .isInt().withMessage('Chaque élément dans impacts doit être un entier.'),
];
