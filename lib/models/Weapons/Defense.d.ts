import { Model, Optional } from "sequelize";
interface DefenceAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}
interface DefenceCreationAttributes extends Optional<DefenceAttributes, 'id'> {
}
export declare class Defence extends Model<DefenceAttributes, DefenceCreationAttributes> implements DefenceAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}
export {};
