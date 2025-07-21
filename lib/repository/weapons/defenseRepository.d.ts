import { Defence } from "../../models/Weapons/Defense";
export declare class DefenceRepository {
    createDefence(weaponId: string, name: string, amount: number): Promise<Defence>;
    getDefenceById(id: number): Promise<Defence | null>;
    getAllDefences(): Promise<Defence[]>;
    updateDefence(id: number, data: Partial<{
        name: string;
        amount: number;
    }>): Promise<Defence | null>;
    deleteDefence(id: number): Promise<boolean>;
}
