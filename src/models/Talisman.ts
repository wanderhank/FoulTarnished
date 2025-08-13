import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/database";

interface TalismanAttributes {
    id: string;
    name: string;
    image: string;
    description: string;
    effect: string;
}

interface TalismanCreationAttributes extends Optional<TalismanAttributes, 'id'> {}

export class Talisman extends Model<TalismanAttributes, TalismanCreationAttributes>
    implements TalismanAttributes {
    public id!: string;
    public name!: string;
    public image!: string;
    public description!: string;
    public effect!: string;

}

Talisman.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        effect: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "talismans",
        modelName: "Talisman"
    }
);