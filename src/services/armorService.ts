import {Armor} from "../models/Armor";
import {ArmorRepository} from "../repository/armorRepository";
import {ArmorAlreadyExistsError} from "../errors/ArmorAlreadyExistsError";
import {ArmorNotFoundError} from "../errors/ArmorNotFoundError";
import {MissingArmorFieldError} from "../errors/MissingArmorFieldError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";


export class ArmorService {

    private repo: ArmorRepository;

    constructor(repo: ArmorRepository) {
        this.repo = repo;
    }

    async createArmor(data: Partial<Armor>) {
        const existing = await this.repo.getArmorByName(<string>data.name);
        if (existing) {
            throw new ArmorAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await this.repo.createArmor(data);
    }

    async getArmorById(id: string) {
        const armor = await this.repo.getArmorById(id);
        if (!armor) {
            throw new ArmorNotFoundError();
        }
        return await this.repo.getArmorById(id);
    }

    async getAllArmors() {
        return await this.repo.getAllArmors();
    }

    async updateArmor(id: string, data: Partial<Armor>) {
        const armor = await this.repo.getArmorById(id);
        if (!armor) {
            throw new ArmorNotFoundError();
        }
        return await this.repo.updateArmor(id, data);
    }

    async deleteArmor(id: string) {
        const success = await this.repo.deleteArmor(id);
        if (!success) {
            throw new ArmorNotFoundError();
        }
        return await this.repo.deleteArmor(id);
    }
}

function hasEmptyRequiredFields(data: Partial<Armor>): boolean {

    const requiredKeys: (keyof Armor)[] = ["name", "image", "description", "category", "weight", "dmgNegation", "resistance"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}


export default new ArmorService(new ArmorRepository());