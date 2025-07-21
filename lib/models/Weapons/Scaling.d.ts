import { Model, Optional } from 'sequelize';
interface ScalingAttributes {
    id: number;
    weapon_id: string;
    name: string;
    scaling: string;
}
interface ScalingCreationAttributes extends Optional<ScalingAttributes, 'id'> {
}
export declare class Scaling extends Model<ScalingAttributes, ScalingCreationAttributes> implements ScalingAttributes {
    id: number;
    weapon_id: string;
    name: string;
    scaling: string;
}
export {};
