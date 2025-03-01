import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { UsuarioModel } from './UsuarioModel.js';


export const HistorialModel = sequelize.define('Historial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
});

UsuarioModel.hasMany(HistorialModel, { foreignKey: 'usuario_id' });
HistorialModel.belongsTo(UsuarioModel, { foreignKey: 'usuario_id' });
