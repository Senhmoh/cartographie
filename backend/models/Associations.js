import Utilisateur from './Utilisateur.js';
import Checklist from './Checklist.js';
import ChecklistImpacts from './ChecklistImpacts.js';
import Impact from './Impact.js';
import Composante from './Composante.js';
import Thematique from './Thematique.js';
import Metier from './Metier.js';

// Associations
Utilisateur.hasMany(Checklist, { foreignKey: 'utilisateur', onDelete: 'CASCADE' });
Checklist.belongsTo(Utilisateur, { foreignKey: 'utilisateur', onDelete: 'CASCADE' });

Checklist.hasMany(ChecklistImpacts, { foreignKey: 'checklist', onDelete: 'CASCADE' });
ChecklistImpacts.belongsTo(Checklist, { foreignKey: 'checklist', onDelete: 'CASCADE' });

Impact.hasMany(ChecklistImpacts, { foreignKey: 'impact', onDelete: 'CASCADE' });
ChecklistImpacts.belongsTo(Impact, { foreignKey: 'impact', onDelete: 'CASCADE' });

Impact.belongsTo(Composante, { foreignKey: 'composante', onDelete: 'CASCADE' });
Impact.belongsTo(Thematique, { foreignKey: 'thematique', onDelete: 'CASCADE' });
Impact.belongsTo(Metier, { foreignKey: 'metier', onDelete: 'CASCADE' });

// Exportation des modèles
export {
  Utilisateur,
  Checklist,
  ChecklistImpacts,
  Impact,
  Composante,
  Thematique,
  Metier,
};
