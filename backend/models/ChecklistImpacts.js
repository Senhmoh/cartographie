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
  },
  impact: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'checklist_impacts',
  schema: 'public',
  timestamps: false,
});

export default ChecklistImpacts;
