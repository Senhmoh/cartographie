import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ChecklistImpacts = sequelize.define('ChecklistImpacts', {
  id_checklist_impacts: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  checklist: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Checklist',
      key: 'id_checklist',
    },
  },
  impact: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Impact',
      key: 'id_impact',
    },
  },
  statut: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Non commencé',
    validate: {
      isIn: [['Non commencé', 'Planifié', 'En attente', 'En cours', 'Suspendu', 'Terminé']],
    },
  },
}, {
  tableName: 'checklist_impacts',
  schema: 'public',
  timestamps: false,
});


export default ChecklistImpacts;
