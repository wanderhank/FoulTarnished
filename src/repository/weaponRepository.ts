import { Weapon } from "../models/Weapon";
import {Shield} from "../models/Shield";


export class WeaponRepository {
    async createWeapon(data: Partial<Weapon>): Promise<Weapon> {
        return await Weapon.create(data as any);
    }

    async getAllWeapons(): Promise<Weapon[]> {
        return await Weapon.findAll();
    }

    async getWeaponById(id: string): Promise<Weapon | null> {
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

    async getWeaponByName(name: string): Promise<Weapon | null> {
        return await Weapon.findOne({where: {name: name}})
    }

}
