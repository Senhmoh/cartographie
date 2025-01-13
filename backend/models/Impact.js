import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ComposanteMaison from './Composante.js';
import Thematique from './Thematique.js';
import Metier from './Metier.js';
import ChecklistImpacts from './ChecklistImpacts.js';

const Impact = sequelize.define('Impact', {
  id_impact: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  impact: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  importance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2, 3]],
    },
  },
}, {
  tableName: 'impacts',
  schema: 'public',
  timestamps: false,
});


export default Impact;