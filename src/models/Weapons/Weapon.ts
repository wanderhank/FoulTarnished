import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../../config/database";

interface WeaponAttributes {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    weight: number;
}

interface WeaponCreationAttributes extends Optional<WeaponAttributes, 'id'> {}


export class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes>
    implements WeaponAttributes {
    public id!: string;
    public name!: string;
    public image!: string;
    public description!: string;
    public category!: string;
    public weight!: number;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Weapon.init(
    {
        id: {
            type: DataTypes.STRING,
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
        }
    },
    {
        sequelize,
        tableName: 'weapons',
        modelName: 'Weapon'
    }
);