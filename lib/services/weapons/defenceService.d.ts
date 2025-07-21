declare class DefenceService {
    createDefence(weaponId: string, name: string, amount: number): Promise<import("../../models/Weapons/Defense").Defence>;
    getDefenceById(id: number): Promise<import("../../models/Weapons/Defense").Defence | null>;
    getAllDefences(): Promise<import("../../models/Weapons/Defense").Defence[]>;
    updateDefence(id: number, data: Partial<{
        name: string;
        amount: number;
    }>): Promise<import("../../models/Weapons/Defense").Defence | null>;
    deleteDefence(id: number): Promise<boolean>;
}
declare const _default: DefenceService;
export default _default;
