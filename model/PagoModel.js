import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { PrestamoModel } from './PrestamoModel.js';


export const PagoModel = sequelize.define('Pago', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  },
  
}, {
  timestamps: false
});

PrestamoModel.hasMany(PagoModel, { foreignKey: 'prestamo_id' });
PagoModel.belongsTo(PrestamoModel, { foreignKey: 'prestamo_id' });
