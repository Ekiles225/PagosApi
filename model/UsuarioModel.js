import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { PersonsModel } from './PersonsModel.js';


export const UsuarioModel = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombreYapellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passware: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
});

PersonsModel.hasMany(UsuarioModel, { foreignKey: "person_id" });
UsuarioModel.belongsTo(PersonsModel, { foreignKey: "person_id" });
