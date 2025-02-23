import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { UsuarioModel } from './UsuarioModel.js';


export const HistorialModel = sequelize.define('Historial', {
    // Los atributos del modelo se definen aquí
    id: {
      //tipo de dato
      type: DataTypes.INTEGER,
      //autoincremento
      autoIncrement: true,
      //clave primaria 
      primaryKey: true
    },
    accion: { 
        type: DataTypes.STRING, 
        allowNull: false },
    detalle: { 
        type: DataTypes.TEXT 
    },
  }, {
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
  });

UsuarioModel.hasMany(HistorialModel, { foreignKey: "usuario_id" });
HistorialModel.belongsTo(UsuarioModel, { foreignKey: "usuario_id" });