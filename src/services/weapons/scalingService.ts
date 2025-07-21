import {ScalingRepository} from "../../repository/weapons/scalingRepository";

const scalingRepository = new ScalingRepository();

class ScalingService {
    async createScaling(weaponId: string, name: string, scaling: string) {
        return await scalingRepository.createScaling(weaponId, name, scaling);
    }

    async getScalingById(id: number) {
        return await scalingRepository.getScalingById(id);
    }

    async getAllScalings() {
        return await scalingRepository.getAllScalings();
    }

    async updateScaling(id: number, data: Partial<{ name: string; scaling: string }>) {
        return await scalingRepository.updateScaling(id, data);
    }

    async deleteScaling(id: number) {
        return await scalingRepository.deleteScaling(id);
    }
}

export default new ScalingService();
