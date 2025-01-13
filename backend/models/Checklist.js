import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Utilisateur from './Utilisateur.js';

const Checklist = sequelize.define('Checklist', {
  id_checklist: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Utilisateur,
      key: 'id_utilisateur',
    },
    onDelete: 'CASCADE',
  },
  nom_checklist: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'checklist',
  schema: 'public',
  timestamps: false,
});

export default Checklist;