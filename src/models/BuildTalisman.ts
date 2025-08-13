import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface BuildTalismanAttributes {
    id: number;
    buildId: number;
    talismanId: number;
    slot: number; // 0 a 3
}

interface BuildTalismanCreationAttributes extends Optional<BuildTalismanAttributes, "id"> {}

export class BuildTalisman extends Model<BuildTalismanAttributes, BuildTalismanCreationAttributes>
    implements BuildTalismanAttributes {
    public id!: number;
    public buildId!: number;
    public talismanId!: number;
    public slot!: number;
}

BuildTalisman.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        buildId: { type: DataTypes.INTEGER, allowNull: false },
        talismanId: { type: DataTypes.INTEGER, allowNull: false },
        slot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 3 }
        }
    },
    {
        sequelize,
        tableName: "build_talismans",
        modelName: "BuildTalisman"
    }
);
