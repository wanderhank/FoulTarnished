import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/database";

interface DmgNegation {
    name: string;
    amount: number;
}

interface ResistanceAmount {
    name: string;
    amount: number;
}

interface ArmorAttributes {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    weight: number;

    dmgNegation: DmgNegation[];
    resistance: ResistanceAmount[];
}

interface ArmorCreationAttributes extends Optional<ArmorAttributes, "id"> {}

export class Armor extends Model<ArmorAttributes, ArmorCreationAttributes>
    implements ArmorAttributes {
    public id!: string;
    public name!: string;
    public image!: string;
    public description!: string;
    public category!: string;
    public weight!: number;

    public dmgNegation!: DmgNegation[];
    public resistance!:ResistanceAmount[];

}
Armor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dmgNegation: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        resistance: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        sequelize,
        tableName: "armors",
        modelName: "Armor"
    }
);
