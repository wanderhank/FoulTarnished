
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from "../config/database";


export type role = "User" | "Admin";

interface AdminAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    role: role;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: role;

}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("User", "Admin"),
            allowNull: false,
            defaultValue: "User",
        }
    },

    {
        sequelize,
        tableName: 'admins',
        modelName: 'Admin'
    }


);


export const findAdminByEmail = async (email: string): Promise<Admin | null> => {
    return await Admin.findOne({where: { email }})
}