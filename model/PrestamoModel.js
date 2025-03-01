import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { ClienteModel } from './ClienteModel.js';


export const PrestamoModel = sequelize.define('Prestamo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tasa_interes: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fecha_vencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'pagado'),
    defaultValue: 'pendiente'
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
});

ClienteModel.hasMany(PrestamoModel, { foreignKey: 'cliente_id' });
PrestamoModel.belongsTo(ClienteModel, { foreignKey: 'cliente_id' });
