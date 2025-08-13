import {TalismanRepository} from "../repository/talismanRepository";
import {Talisman} from "../models/Talisman";
import {TalismanAlreadyExistsError} from "../errors/TalismanAlreadyExistsError";
import {TalismanNotFoundError} from "../errors/TalismanNotFoundError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";


const talismanRepository = new TalismanRepository();

class TalismanService {
    async createTalisman(data: Partial<Talisman>) {
        const existing = await talismanRepository.getTalismanByName(<string>data.name);
        if (existing) {
            throw new TalismanAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await talismanRepository.createTalisman(data);
    }

    async getTalismanById(id: string) {
        const talisman = await talismanRepository.getByTalismanId(id);
        if (!talisman) {
            throw new TalismanNotFoundError();
        }
        return await talismanRepository.getByTalismanId(id);
    }

    async getAllArmours() {
        return await talismanRepository.getAllTalismans();
    }

    async updateTalisman(id: string, data: Partial<Talisman>) {
        const talisman = await talismanRepository.getByTalismanId(id);
        if (!talisman) {
            throw new TalismanNotFoundError();
        }
        return await talismanRepository.updateTalisman(id, data);
    }

    async deleteTalisman(id: string) {
        const success = await talismanRepository.deleteTalisman(id);
        if (!success) {
            throw new TalismanNotFoundError();
        }
        return await talismanRepository.deleteTalisman(id);
    }
}
function hasEmptyRequiredFields(data: Partial<Talisman>): boolean {

    const requiredKeys: (keyof Talisman)[] = ["name", "image", "description", "effect"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}


export default new TalismanService();