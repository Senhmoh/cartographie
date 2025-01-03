import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Metier = sequelize.define('Metier', {
  id_metier: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_metier: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'metiers',
  schema: 'public',
  timestamps: false,
});

export default Metier;