
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from "../config/database";


interface AdminAttributes {
    id: string;
    name: string;
    email: string;
    password: string; // hash da senha
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;

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
        }
    },
    {
        sequelize,
        tableName: 'admins',
        modelName: 'Admin'
    }
);
