import {ShieldRepository} from "../repository/shieldRepository";
import {Shield} from "../models/Shield";
import {ShieldAlreadyExistsError} from "../errors/ShieldAlreadyExistsError";
import {ShieldNotFoundError} from "../errors/ShieldNotFoundError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";


export class ShieldService {

    private repo: ShieldRepository

    constructor(repo: ShieldRepository) {
        this.repo = repo;
    }

    async createShield(data: Partial<Shield>) {
        const existing = await this.repo.getShieldByName(<string>data.name);
        if (existing) {
            throw new ShieldAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await this.repo.createShield(data);
    }

    async getShieldById(id: string) {
        const armor = await this.repo.getShieldById(id);
        if (!armor) {
            throw new ShieldNotFoundError();
        }
        return await this.repo.getShieldById(id);
    }

    async getAllShields() {
        return await this.repo.getAllShields();
    }

    async updateShield(id: string, data: Partial<Shield>) {
        const shield = await this.repo.getShieldById(id);
        if (!shield) {
            throw new ShieldNotFoundError();
        }
        return await this.repo.updateShield(id, data);
    }

    async deleteShield(id: string) {
        const success = await this.repo.deleteShield(id);
        if (!success) {
            throw new ShieldNotFoundError();
        }
        return await this.repo.deleteShield(id);
    }
}

function hasEmptyRequiredFields(data: Partial<Shield>): boolean {

    const requiredKeys: (keyof Shield)[] = ["name", "image", "description", "category", "weight", "attack", "defence", "requiredAttributes", "scalesWith"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}

export default new ShieldService(new ShieldRepository());
