import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ComposanteMaison from './Composante.js';
import Thematique from './Thematique.js';
import Metier from './Metier.js';

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

Impact.belongsTo(ComposanteMaison, { foreignKey: 'composante', onDelete: 'CASCADE' });
Impact.belongsTo(Thematique, { foreignKey: 'thematique', onDelete: 'CASCADE' });
Impact.belongsTo(Metier, { foreignKey: 'metier', onDelete: 'CASCADE' });

export default Impact;