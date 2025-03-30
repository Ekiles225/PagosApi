import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const PersonsModel = sequelize.define("persons",{
        id:{
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
        },
        nombreUsuario:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps:false
    }
)