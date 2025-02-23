import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { UsuarioModel } from './UsuarioModel.js';


export const PrestamoModel = sequelize.define('Prestamo', {
    // Los atributos del modelo se definen aquí
    id: {
      //tipo de dato
      type: DataTypes.INTEGER,
      //autoincremento
      autoIncrement: true,
      //clave primaria 
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
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
  });

UsuarioModel.hasMany(PrestamoModel, { foreignKey: "usuario_id" });
PrestamoModel.belongsTo(UsuarioModel, { foreignKey: "usuario_id" });