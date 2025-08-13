import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";


interface AttributeAmount {
    name: string;
    amount: number;
}

interface AttributeScaling {
    name: string;
    scaling: string;
}

interface WeaponAttributes {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    weight: number;

    attack: AttributeAmount[];
    defence: AttributeAmount[];
    requiredAttributes: AttributeAmount[];
    scalesWith: AttributeScaling[];
}

interface WeaponCreationAttributes extends Optional<WeaponAttributes, "id"> {}

export class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes>
    implements WeaponAttributes {
    public id!: string;
    public name!: string;
    public image!: string;
    public description!: string;
    public category!: string;
    public weight!: number;

    public attack!: AttributeAmount[];
    public defence!: AttributeAmount[];
    public requiredAttributes!: AttributeAmount[];
    public scalesWith!: AttributeScaling[];

}

Weapon.init(
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
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        attack: {
            type: DataTypes.JSON,
            allowNull: false
        },
        defence: {
            type: DataTypes.JSON,
            allowNull: false
        },
        requiredAttributes: {
            type: DataTypes.JSON,
            allowNull: false
        },
        scalesWith: {
            type: DataTypes.JSON,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "weapons",
        modelName: "Weapon"
    }
);
