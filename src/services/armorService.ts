import {Armor} from "../models/Armor";
import {ArmorRepository} from "../repository/armorRepository";
import {ArmorAlreadyExistsError} from "../errors/ArmorAlreadyExistsError";
import {ArmorNotFoundError} from "../errors/ArmorNotFoundError";
import {MissingArmorFieldError} from "../errors/MissingArmorFieldError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";

const armorRepository = new ArmorRepository();

class ArmorService {
    async createArmor(data: Partial<Armor>) {
        const existing = await armorRepository.getArmorByName(<string>data.name);
        if (existing) {
            throw new ArmorAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await armorRepository.createArmor(data);
    }

    async getArmorById(id: string) {
        const armor = await armorRepository.getByArmorId(id);
        if (!armor) {
            throw new ArmorNotFoundError();
        }
        return await armorRepository.getByArmorId(id);
    }

    async getAllArmors() {
        return await armorRepository.getAllArmors();
    }

    async updateArmor(id: string, data: Partial<Armor>) {
        const armor = await armorRepository.getByArmorId(id);
        if (!armor) {
            throw new ArmorNotFoundError();
        }
        return await armorRepository.updateArmor(id, data);
    }

    async deleteArmor(id: string) {
        const success = await armorRepository.deleteArmor(id);
        if (!success) {
            throw new ArmorNotFoundError();
        }
        return await armorRepository.deleteArmor(id);
    }
}

function hasEmptyRequiredFields(data: Partial<Armor>): boolean {

    const requiredKeys: (keyof Armor)[] = ["name", "image", "description", "category", "weight", "dmgNegation", "resistance"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}


export default new ArmorService();