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

interface ShieldAttributes {
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

interface ShieldCreationAttributes extends Optional<ShieldAttributes, "id"> {}

export class Shield extends Model<ShieldAttributes, ShieldCreationAttributes>
    implements ShieldAttributes {
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

Shield.init(
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
        tableName: "shields",
        modelName: "Shield"
    }
);
