import sequelize from "../config/database";
import {Association, DataTypes, HasManyGetAssociationsMixin, Model, Optional} from "sequelize";
import {Armor} from "./Armor";
import { Talisman } from "./Talisman";
import {BuildArmor} from "./BuildArmor";
import {BuildTalisman} from "./BuildTalisman";
import {Weapon} from "./Weapon";
import {Shield} from "./Shield";

interface BuildAttributes {
    id: number;
    name: string;
    description: string;

    equipment1Id: number;
    equipment1Type: "weapon" | "shield";
    equipment2Id: number;
    equipment2Type: "weapon" | "shield";
}

interface BuildCreationAttributes extends Optional<BuildAttributes, "id"> {}

export class Build extends Model<BuildAttributes, BuildCreationAttributes> implements BuildAttributes {
    public id!: number;
    public name!: string;
    public description!: string;

    public equipment1Id!: number;
    public equipment1Type!: "weapon" | "shield";
    public equipment2Id!: number;
    public equipment2Type!: "weapon" | "shield";

    public readonly armors?: Armor[];
    public readonly talismans?: Talisman[];

    public static associations: {
        armors: Association<Build, Armor>;
        talismans: Association<Build, Talisman>;
    };
}

Build.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        equipment1Id: { type: DataTypes.INTEGER, allowNull: false },
        equipment1Type: { type: DataTypes.ENUM("weapon", "shield"), allowNull: false },
        equipment2Id: { type: DataTypes.INTEGER, allowNull: false },
        equipment2Type: { type: DataTypes.ENUM("weapon", "shield"), allowNull: false }
    },
    {
        sequelize,
        tableName: "builds",
        modelName: "Build"
    }
);

Build.belongsToMany(Armor, { through: BuildArmor, foreignKey: "buildId", as: "armors" });
Armor.belongsToMany(Build, { through: BuildArmor, foreignKey: "armorId", as: "builds" });

Build.belongsToMany(Talisman, { through: BuildTalisman, foreignKey: "buildId", as: "talismans" });
Talisman.belongsToMany(Build, { through: BuildTalisman, foreignKey: "talismanId", as: "builds" });

Build.hasOne(Weapon, { foreignKey: "id", sourceKey: "equipment1Id", constraints: false, as: "equipment1Weapon" });
Build.hasOne(Shield, { foreignKey: "id", sourceKey: "equipment1Id", constraints: false, as: "equipment1Shield" });

Build.hasOne(Weapon, { foreignKey: "id", sourceKey: "equipment2Id", constraints: false, as: "equipment2Weapon" });
Build.hasOne(Shield, { foreignKey: "id", sourceKey: "equipment2Id", constraints: false, as: "equipment2Shield" });

