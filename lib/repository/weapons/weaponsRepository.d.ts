import { Weapon } from "../../models/Weapons/Weapon";
export declare class WeaponRepository {
    createWeapon(id: string, name: string, image: string, description: string, category: string, weight: number, attack: {
        name: string;
        amount: number;
    }[], defence: {
        name: string;
        amount: number;
    }[], requiredAttributes: {
        name: string;
        amount: number;
    }[], scalesWith: {
        name: string;
        scaling: string;
    }[]): Promise<Weapon>;
    getWeaponById(id: string): Promise<Weapon | null>;
    getAllWeapons(): Promise<Weapon[]>;
    updateWeapon(id: string, data: Partial<{
        name: string;
        image: string;
        description: string;
        category: string;
        weight: number;
    }>): Promise<Weapon | null>;
    deleteWeapon(id: string): Promise<boolean>;
}
