import {RequiredAttributeRepository} from "../../repository/weapons/defenceRepository";

const requiredAttributeRepository = new RequiredAttributeRepository();

class RequiredAttributeService {
    async createRequiredAttribute(weaponId: string, name: string, amount: number) {
        return await requiredAttributeRepository.createRequiredAttribute(weaponId, name, amount);
    }

    async getRequiredAttributeById(id: number) {
        return await requiredAttributeRepository.getRequiredAttributeById(id);
    }

    async getAllRequiredAttributes() {
        return await requiredAttributeRepository.getAllRequiredAttributes();
    }

    async updateRequiredAttribute(id: number, data: Partial<{ name: string; amount: number }>) {
        return await requiredAttributeRepository.updateRequiredAttribute(id, data);
    }

    async deleteRequiredAttribute(id: number) {
        return await requiredAttributeRepository.deleteRequiredAttribute(id);
    }
}

export default new RequiredAttributeService();
