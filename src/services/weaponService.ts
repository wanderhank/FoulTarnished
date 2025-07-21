import { WeaponRepository } from "../repository/weaponRepository";
import { Weapon } from "../models/Weapon";

const weaponRepository = new WeaponRepository();

class WeaponService {
    async createWeapon(data: Partial<Weapon>) {
        return await weaponRepository.createWeapon(data);
    }

    async getWeaponById(id: string) {
        return await weaponRepository.getByWeaponId(id);
    }

    async getAllWeapons() {
        return await weaponRepository.getAllWeapons();
    }

    async updateWeapon(id: string, data: Partial<Weapon>) {
        return await weaponRepository.updateWeapon(id, data);
    }

    async deleteWeapon(id: string) {
        return await weaponRepository.deleteWeapon(id);
    }
}

export default new WeaponService();
