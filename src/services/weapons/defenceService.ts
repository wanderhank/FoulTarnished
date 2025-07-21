import {DefenceRepository} from "../../repository/weapons/defenseRepository";


const defenceRepository = new DefenceRepository();

class DefenceService {
    async createDefence(weaponId: string, name: string, amount: number) {
        return await defenceRepository.createDefence(weaponId, name, amount);
    }

    async getDefenceById(id: number) {
        return await defenceRepository.getDefenceById(id);
    }

    async getAllDefences() {
        return await defenceRepository.getAllDefences();
    }

    async updateDefence(id: number, data: Partial<{ name: string; amount: number }>) {
        return await defenceRepository.updateDefence(id, data);
    }

    async deleteDefence(id: number) {
        return await defenceRepository.deleteDefence(id);
    }
}

export default new DefenceService();

