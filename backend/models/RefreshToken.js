import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RefreshToken = sequelize.define('RefreshToken', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'utilisateurs', // Nom de la table utilisateur
            key: 'id_utilisateur',
        },
        onDelete: 'CASCADE',
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'refresh_tokens',
    timestamps: false, // Désactive les colonnes createdAt et updatedAt
    indexes: [
        {
            unique: true,
            fields: ['token'],
        },
    ],    
});

export default RefreshToken;
