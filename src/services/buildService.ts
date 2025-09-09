import {Build} from "../models/Build";
import {BuildRepository} from "../repository/buildRepository";
import {BuildAlreadyExistsError} from "../errors/BuildAlreadyExistsError";
import {BuildNotFoundError} from "../errors/BuildNotFoundError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";


export class BuildService {

    private repo: BuildRepository;

    constructor(repo: BuildRepository) {
        this.repo = repo;
    }

    async createBuild(data: Partial<Build>) {
        const existing = await this.repo.getBuildByName(<string>data.name);
        if (existing) {
            throw new BuildAlreadyExistsError();
        }
        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        return await this.repo.createBuild(data);
    }

    async getBuildById(id: string) {
        const build = await this.repo.getBuildById(id);
        if (!build) {
            throw new BuildNotFoundError();
        }
        return await this.repo.getBuildById(id);
    }

    async getAllBuilds() {
        return await this.repo.getAllBuilds();
    }

    async updateBuild(id: string, data: Partial<Build>) {
        const build = await this.repo.getBuildById(id);
        if (!build) {
            throw new BuildNotFoundError();
        }
        return await this.repo.updateBuild(id, data);
    }

    async deleteBuild(id: string) {
        const success = await this.repo.deleteBuild(id);
        if (!success) {
            throw new BuildNotFoundError();
        }
        return await this.repo.deleteBuild(id);
    }
}

function hasEmptyRequiredFields(data: Partial<Build>): boolean {

    const requiredKeys: (keyof Build)[] = ["name",  "description", "weaponOneId", "weaponTwoId", "helmId", "chestArmorId", "legArmorId", "gauntletId", "talismanOneId", "talismanTwoId", "talismanThreeId", "talismanFourId"]

    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}


export default new BuildService(new BuildRepository());