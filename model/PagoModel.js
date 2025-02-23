import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { PrestamoModel } from './PrestamoModel.js';


export const PagoModel = sequelize.define('Pago', {
    // Los atributos del modelo se definen aquí
    id: {
      //tipo de dato
      type: DataTypes.INTEGER,
      //autoincremento
      autoIncrement: true,
      //clave primaria 
      primaryKey: true
    },
    monto_pagado: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    fecha_pago: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    saldo_restante: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    }
  }, {
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
  });

PrestamoModel.hasMany(PagoModel, { foreignKey: "prestamo_id" });
PagoModel.belongsTo(PrestamoModel, { foreignKey: "prestamo_id" });