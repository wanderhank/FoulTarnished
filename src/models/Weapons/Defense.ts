import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../../config/database";
import {Weapon} from "./Weapon";

interface DefenceAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}

interface DefenceCreationAttributes extends Optional<DefenceAttributes, 'id'> {}

export class Defence extends Model<DefenceAttributes, DefenceCreationAttributes> implements DefenceAttributes {
    public id!: number;
    public weapon_id!: string;
    public name!: string;
    public amount!: number;
}

Defence.init(
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
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'defences',
        modelName: 'Defence'
    }
);

Defence.belongsTo(Weapon, { foreignKey: 'weapon_id', as: 'weapon' });