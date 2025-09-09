import sequelize from "../config/database";
import {DataTypes, Model, Optional} from "sequelize";
import {Admin} from "./Admin";


interface BuildAttributes {
    id: number;
    name: string;
    description: string;

    weaponOneId: number;
    weaponTwoId: number;
    helmId: number;
    chestArmorId: number;
    legArmorId: number;
    gauntletId: number;
}

interface BuildCreationAttributes extends Optional<BuildAttributes, "id"> {}

export class Build extends Model<BuildAttributes, BuildCreationAttributes> implements BuildAttributes {
    public id!: number;
    public name!: string;
    public description!: string;

    public weaponOneId!: number;
    public weaponTwoId!: number;
    public helmId!: number;
    public chestArmorId!: number;
    public legArmorId!: number;
    public gauntletId!: number;
    public talismanOneId!: number;
    public talismanTwoId!: number;
    public talismanThreeId!: number;
    public talismanFourId!: number;


}

Build.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        weaponOneId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        weaponTwoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        helmId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        chestArmorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        legArmorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        gauntletId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        tableName: "builds",
        modelName: "Build"
    }
);

Build.belongsTo(Admin, {foreignKey: 'admin_id', as: 'admin'});



