import {BuildRepository} from "../repository/buildRepository";
import {Build} from "../models/Build";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";

const buildRepository = new BuildRepository();
class BuildService {
    async createBuild(data: Partial<Build>) {
        const {
            name,
            description,
            equipment1Id,
            equipment1Type,
            equipment2Id,
            equipment2Type,
            armors,
            talismans
        } = data;
        if (
            !name ||
            !description ||
            !equipment1Id ||
            !equipment1Type ||
            !equipment2Id ||
            !equipment2Type ||
            !Array.isArray(armors) ||
            armors.length !== 4 ||
            !Array.isArray(talismans) ||
            talismans.length !== 4
        ) {
            throw new RequiredFieldsAreMissingError();
        }
        return await buildRepository.createBuild(data);
    }
}

export default new BuildService();