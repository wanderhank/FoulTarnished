import {Attack} from "../../models/Weapons/Attack";


export class AttackRepository {
    async createAttack(weaponId: string, name: string, amount: number) {
        return await Attack.create({ weapon_id: weaponId, name, amount });
    }

    async getAttackById(id: number) {
        return await Attack.findByPk(id, {
            include: ['weapon']
        });
    }

    async getAllAttacks() {
        return await Attack.findAll({
            include: ['weapon']
        });
    }

    async updateAttack(
        id: number,
        data: Partial<{ name: string; amount: number }>
    ) {
        const attack = await Attack.findByPk(id);
        return attack ? await attack.update(data) : null;
    }

    async deleteAttack(id: number) {
        const attack = await Attack.findByPk(id);
        if (attack) {
            await attack.destroy();
            return true;
        }
        return false;
    }
}
