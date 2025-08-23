import {WeaponRepository} from "../repository/weaponRepository";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {Weapon} from "../models/Weapon";
import {WeaponAlreadyExistsError} from "../errors/WeaponAlreadyExistsError";
import {WeaponNotFoundError} from "../errors/WeaponNotFoundError";



export class WeaponService {

    private repo: WeaponRepository

    constructor(repo: WeaponRepository) {
        this.repo = repo;
    }

    async createWeapon(data: Partial<Weapon>) {
        const existing = await this.repo.getWeaponByName(<string>data.name);
        if (existing) {
            throw new WeaponAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await this.repo.createWeapon(data);
    }

    async getWeaponById(id: string) {
        const armor = await this.repo.getWeaponById(id);
        if (!armor) {
            throw new WeaponNotFoundError();
        }
        return await this.repo.getWeaponById(id);
    }

    async getAllWeapons() {
        return await this.repo.getAllWeapons();
    }

    async updateWeapon(id: string, data: Partial<Weapon>) {
        const shield = await this.repo.getWeaponById(id);
        if (!shield) {
            throw new WeaponNotFoundError();
        }
        return await this.repo.updateWeapon(id, data);
    }

    async deleteWeapon(id: string) {
        const success = await this.repo.deleteWeapon(id);
        if (!success) {
            throw new WeaponNotFoundError();
        }
        return await this.repo.deleteWeapon(id);
    }
}

function hasEmptyRequiredFields(data: Partial<Weapon>): boolean {

    const requiredKeys: (keyof Weapon)[] = ["name", "image", "description", "category", "weight", "attack", "defence", "requiredAttributes", "scalesWith"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}

export default new WeaponService(new WeaponRepository());
