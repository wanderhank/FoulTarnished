import { Attack } from "../../models/Weapons/Attack";
export declare class AttackRepository {
    createAttack(weaponId: string, name: string, amount: number): Promise<Attack>;
    getAttackById(id: number): Promise<Attack | null>;
    getAllAttacks(): Promise<Attack[]>;
    updateAttack(id: number, data: Partial<{
        name: string;
        amount: number;
    }>): Promise<Attack | null>;
    deleteAttack(id: number): Promise<boolean>;
}
