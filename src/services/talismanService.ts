import {TalismanRepository} from "../repository/talismanRepository";
import {Talisman} from "../models/Talisman";
import {TalismanAlreadyExistsError} from "../errors/TalismanAlreadyExistsError";
import {TalismanNotFoundError} from "../errors/TalismanNotFoundError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";

export class TalismanService {

    private repo: TalismanRepository;

    constructor(repo: TalismanRepository) {
        this.repo = repo;
    }
    async createTalisman(data: Partial<Talisman>) {
        const existing = await this.repo.getTalismanByName(<string>data.name);
        if (existing) {
            throw new TalismanAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await this.repo.createTalisman(data);
    }

    async getTalismanById(id: string) {
        const talisman = await this.repo.getTalismanById(id);
        if (!talisman) {
            throw new TalismanNotFoundError();
        }
        return await this.repo.getTalismanById(id);
    }

    async getAllTalismans() {
        return await this.repo.getAllTalismans();
    }

    async updateTalisman(id: string, data: Partial<Talisman>) {
        const talisman = await this.repo.getTalismanById(id);
        if (!talisman) {
            throw new TalismanNotFoundError();
        }
        return await this.repo.updateTalisman(id, data);
    }

    async deleteTalisman(id: string) {
        const success = await this.repo.deleteTalisman(id);
        if (!success) {
            throw new TalismanNotFoundError();
        }
        return await this.repo.deleteTalisman(id);
    }
}
function hasEmptyRequiredFields(data: Partial<Talisman>): boolean {

    const requiredKeys: (keyof Talisman)[] = ["name", "image", "description", "effect"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}

export default new TalismanService(new TalismanRepository());