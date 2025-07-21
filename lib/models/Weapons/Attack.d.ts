import { Model, Optional } from "sequelize";
interface AttackAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}
interface AttackCreationAttributes extends Optional<AttackAttributes, 'id'> {
}
export declare class Attack extends Model<AttackAttributes, AttackCreationAttributes> implements AttackAttributes {
    id: number;
    weapon_id: string;
    name: string;
    amount: number;
}
export {};
