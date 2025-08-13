import {Build} from "../models/Build";

export class BuildRepository {
    async createBuild(data: Partial<Build>): Promise<Build> {
        return await Build.create(data as any);
    }
}