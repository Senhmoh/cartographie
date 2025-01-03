import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Thematique = sequelize.define('Thematique', {
  id_thematique: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_thematique: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'thematiques',
  schema: 'public',
  timestamps: false,
});

export default Thematique;