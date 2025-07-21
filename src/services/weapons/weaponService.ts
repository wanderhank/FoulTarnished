import {WeaponRepository} from "../../repository/weapons/weaponsRepository";

const weaponRepository = new WeaponRepository();

class WeaponService {
    async createWeapon(
        id: string,
        name: string,
        image: string,
        description: string,
        category: string,
        weight: number,
        attack: { name: string; amount: number }[],
        defence: { name: string; amount: number }[],
        requiredAttributes: { name: string; amount: number }[],
        scalesWith: { name: string; scaling: string }[]
    ) {
        return await weaponRepository.createWeapon(
            id,
            name,
            image,
            description,
            category,
            weight,
            attack,
            defence,
            requiredAttributes,
            scalesWith
        );
    }

    async getWeaponById(id: string) {
        return await weaponRepository.getWeaponById(id);
    }

    async getAllWeapons() {
        return await weaponRepository.getAllWeapons();
    }

    async updateWeapon(
        id: string,
        data: Partial<{
            name: string;
            image: string;
            description: string;
            category: string;
            weight: number;
        }>
    ) {
        return await weaponRepository.updateWeapon(id, data);
    }

    async deleteWeapon(id: string) {
        return await weaponRepository.deleteWeapon(id);
    }
}

export default new WeaponService();