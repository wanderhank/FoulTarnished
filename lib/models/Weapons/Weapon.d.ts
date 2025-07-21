import { Model, Optional } from "sequelize";
interface WeaponAttributes {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    weight: number;
}
interface WeaponCreationAttributes extends Optional<WeaponAttributes, 'id'> {
}
export declare class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes> implements WeaponAttributes {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    weight: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
