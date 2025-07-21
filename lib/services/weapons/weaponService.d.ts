declare class WeaponService {
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
    }[]): Promise<import("../../models/Weapons/Weapon").Weapon>;
    getWeaponById(id: string): Promise<import("../../models/Weapons/Weapon").Weapon | null>;
    getAllWeapons(): Promise<import("../../models/Weapons/Weapon").Weapon[]>;
    updateWeapon(id: string, data: Partial<{
        name: string;
        image: string;
        description: string;
        category: string;
        weight: number;
    }>): Promise<import("../../models/Weapons/Weapon").Weapon | null>;
    deleteWeapon(id: string): Promise<boolean>;
}
declare const _default: WeaponService;
export default _default;
