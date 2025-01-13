// Supprimer l'import direct de Checklist
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Utilisateur = sequelize.define('Utilisateur', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_utilisateur: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    mot_de_passe: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { notEmpty: true },
    },
}, {
    tableName: 'utilisateurs',
    schema: 'public',
    timestamps: false,
});

// Exporter sans définir les associations
export default Utilisateur;
