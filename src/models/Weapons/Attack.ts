import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../../config/database";
import {Weapon} from "./Weapon";


interface AttackAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}

interface AttackCreationAttributes extends Optional<AttackAttributes, 'id'> {}

export class Attack extends Model<AttackAttributes, AttackCreationAttributes> implements AttackAttributes {
    public id!: number;
    public weapon_id!: string;
    public name!: string;
    public amount!: number;
}

Attack.init(
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
        tableName: 'attacks',
        modelName: 'Attack'
    }
);

Attack.belongsTo(Weapon, { foreignKey: 'weapon_id', as: 'weapon' });
