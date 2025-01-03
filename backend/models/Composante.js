import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ComposanteMaison = sequelize.define('ComposanteMaison', {
  id_composante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_composante: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'composantes_maison',
  schema: 'public',
  timestamps: false,
});

export default ComposanteMaison;