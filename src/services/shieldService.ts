import { ShieldRepository } from "../repository/shieldRepository";
import { Shield } from "../models/Shield";

const shieldRepository = new ShieldRepository();

class ShieldService {
    async createShield(data: Partial<Shield>) {
        return await shieldRepository.createShield(data);
    }

    async getShieldById(id: string) {
        return await shieldRepository.getShieldById(id);
    }

    async getAllShields() {
        return await shieldRepository.getAllShields();
    }

    async updateShield(id: string, data: Partial<Shield>) {
        return await shieldRepository.updateShield(id, data);
    }

    async deleteShield(id: string) {
        return await shieldRepository.deleteShield(id);
    }
}

export default new ShieldService();
