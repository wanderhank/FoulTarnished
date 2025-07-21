import { Model, DataTypes, Optional } from 'sequelize';

import { Weapon } from './Weapon';
import sequelize from "../../config/database";

interface ScalingAttributes {
    id: number;
    weapon_id: string;
    name: string;
    scaling: string;
}

interface ScalingCreationAttributes extends Optional<ScalingAttributes, 'id'> {}

export class Scaling extends Model<ScalingAttributes, ScalingCreationAttributes>
    implements ScalingAttributes {
    public id!: number;
    public weapon_id!: string;
    public name!: string;
    public scaling!: string;
}

Scaling.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        weapon_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scaling: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'scalings',
        modelName: 'Scaling'
    }
);

Scaling.belongsTo(Weapon, { foreignKey: 'weapon_id', as: 'weapon' });