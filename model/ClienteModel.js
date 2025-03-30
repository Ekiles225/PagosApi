import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { UsuarioModel } from './UsuarioModel.js';

export const ClienteModel = sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING
    },
    direccion: {
      type: DataTypes.TEXT
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false
  });

// Relaciones con eliminación en cascada
UsuarioModel.hasMany(ClienteModel, { foreignKey: 'usuario_id', onDelete: 'CASCADE', hooks: true });
ClienteModel.belongsTo(UsuarioModel, { foreignKey: 'usuario_id' });
