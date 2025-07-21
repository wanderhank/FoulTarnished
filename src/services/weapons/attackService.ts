import {AttackRepository} from "../../repository/weapons/attackRepository";


const attackRepository = new AttackRepository();

class AttackService {
    async createAttack(weaponId: string, name: string, amount: number) {
        return await attackRepository.createAttack(weaponId, name, amount);
    }

    async getAttackById(id: number) {
        return await attackRepository.getAttackById(id);
    }

    async getAllAttacks() {
        return await attackRepository.getAllAttacks();
    }

    async updateAttack(id: number, data: Partial<{ name: string; amount: number }>) {
        return await attackRepository.updateAttack(id, data);
    }

    async deleteAttack(id: number) {
        return await attackRepository.deleteAttack(id);
    }
}

export default new AttackService();
