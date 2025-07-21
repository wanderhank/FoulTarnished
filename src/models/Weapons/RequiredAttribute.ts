import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../../config/database";
import {Weapon} from "./Weapon";

interface RequiredAttributeAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}

interface RequiredAttributeCreationAttributes extends Optional<RequiredAttributeAttributes, 'id'> {}

export class RequiredAttribute extends Model<RequiredAttributeAttributes, RequiredAttributeCreationAttributes>
    implements RequiredAttributeAttributes {
    public id!: number;
    public weapon_id!: string;
    public name!: string;
    public amount!: number;
}

RequiredAttribute.init(
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
        tableName: 'required_attributes',
        modelName: 'RequiredAttribute'
    }
);

RequiredAttribute.belongsTo(Weapon, { foreignKey: 'weapon_id', as: 'weapon' });
