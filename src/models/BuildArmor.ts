import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface BuildArmorAttributes {
    id: number;
    buildId: number;
    armorId: number;
    slot: number; // 0 a 3
}

interface BuildArmorCreationAttributes extends Optional<BuildArmorAttributes, "id"> {}

export class BuildArmor extends Model<BuildArmorAttributes, BuildArmorCreationAttributes>
    implements BuildArmorAttributes {
    public id!: number;
    public buildId!: number;
    public armorId!: number;
    public slot!: number;
}

BuildArmor.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        buildId: { type: DataTypes.INTEGER, allowNull: false },
        armorId: { type: DataTypes.INTEGER, allowNull: false },
        slot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 3 }
        }
    },
    {
        sequelize,
        tableName: "build_armors",
        modelName: "BuildArmor"
    }
);
