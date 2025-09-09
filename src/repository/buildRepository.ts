import {Build} from "../models/Build";


export class BuildRepository {
    async createBuild(data: Partial<Build>): Promise<Build> {
        return await Build.create(data as any);
    }

    async getAllBuilds(): Promise<Build[]> {
        return await Build.findAll();
    }

    async getBuildById(id: string): Promise<Build | null> {
        return await Build.findByPk(id);
    }

    async getBuildByName(name: string): Promise<Build | null> {
        return await Build.findOne({where: {name: name}})
    }

    async updateBuild(id: string, data: Partial<Build>): Promise<Build | null> {
        const build = await Build.findByPk(id);
        if (!build) return null;
        await build.update(data);
        return build;
    }

    async deleteBuild(id: string): Promise<boolean> {
        let resp = false;
        const build = await Build.findByPk(id);
        if (build) {
            await build.destroy();
            resp = true;
        }
        return resp;
    }

}