import {Talisman} from "../models/Talisman";


export class TalismanRepository {
    async createTalisman(data: Partial<Talisman>): Promise<Talisman> {
        return await Talisman.create(data as any);
    }

    async getAllTalismans(): Promise<Talisman[]> {
        return await Talisman.findAll();
    }

    async getByTalismanId(id: string): Promise<Talisman | null> {
        return await Talisman.findByPk(id);
    }

    async getTalismanByName(name: string): Promise<Talisman | null> {
        return await Talisman.findOne({where: {name: name}})
    }

    async updateTalisman(id: string, data: Partial<Talisman>): Promise<Talisman | null> {
        const talisman = await Talisman.findByPk(id);
        if (!talisman) return null;
        await talisman.update(data);
        return talisman;
    }

    async deleteTalisman(id: string): Promise<boolean> {
        let resp = false;
        const talisman = await Talisman.findByPk(id);
        if (talisman) {
            await talisman.destroy();
            resp = true;
        }
        return resp;
    }

}