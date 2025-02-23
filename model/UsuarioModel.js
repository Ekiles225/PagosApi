import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';

export const UsuarioModel = sequelize.define('Usuario', {
    // Los atributos del modelo se definen aquí
    id: {
      //tipo de dato
      type: DataTypes.INTEGER,
      //autoincremento
      autoIncrement: true,
      //clave primaria 
      primaryKey: true
    },
    nombreYapellido: {
      type: DataTypes.STRING, 
      //no permitir valores nulos
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      unique: true, allowNull: false
    },
    passware: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: { 
        type: DataTypes.ENUM('admin', 'deudor'),
        allowNull: false 
    },
    telefono: { 
        type: DataTypes.STRING 
    }
  }, {
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
  });