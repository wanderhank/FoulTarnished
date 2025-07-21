import { Model, Optional } from 'sequelize';
interface AdminAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}
interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {
}
export declare class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
