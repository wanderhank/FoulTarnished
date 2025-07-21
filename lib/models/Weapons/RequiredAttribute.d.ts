import { Model, Optional } from "sequelize";
interface RequiredAttributeAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}
interface RequiredAttributeCreationAttributes extends Optional<RequiredAttributeAttributes, 'id'> {
}
export declare class RequiredAttribute extends Model<RequiredAttributeAttributes, RequiredAttributeCreationAttributes> implements RequiredAttributeAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}
export {};
