declare class AttackService {
    createAttack(weaponId: string, name: string, amount: number): Promise<import("../../models/Weapons/Attack").Attack>;
    getAttackById(id: number): Promise<import("../../models/Weapons/Attack").Attack | null>;
    getAllAttacks(): Promise<import("../../models/Weapons/Attack").Attack[]>;
    updateAttack(id: number, data: Partial<{
        name: string;
        amount: number;
    }>): Promise<import("../../models/Weapons/Attack").Attack | null>;
    deleteAttack(id: number): Promise<boolean>;
}
declare const _default: AttackService;
export default _default;
