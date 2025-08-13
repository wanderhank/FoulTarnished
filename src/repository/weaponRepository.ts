import { Weapon } from "../models/Weapon";


export class WeaponRepository {
    async createWeapon(data: Partial<Weapon>): Promise<Weapon> {
        return await Weapon.create(data as any);
    }

    async getAllWeapons(): Promise<Weapon[]> {
        return await Weapon.findAll();
    }

    async getByWeaponId(id: string): Promise<Weapon | null> {
        return await Weapon.findByPk(id);
    }

    async updateWeapon(id: string, data: Partial<Weapon>): Promise<Weapon | null> {
        const weapon = await Weapon.findByPk(id);
        if (!weapon) return null;

        await weapon.update(data);
        return weapon;
    }

    async deleteWeapon(id: string): Promise<boolean> {
        let resp = false;
        const weapon = await Weapon.findByPk(id);
        if (weapon) {
            await weapon.destroy();
            resp = true;
        }
        return resp;
    }

}
