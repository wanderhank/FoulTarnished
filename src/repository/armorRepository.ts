import {Armor} from "../models/Armor";


export class ArmorRepository {
    async createArmor(data: Partial<Armor>): Promise<Armor> {
        return await Armor.create(data as any);
    }

    async getAllArmors(): Promise<Armor[]> {
        return await Armor.findAll();
    }

    async getArmorById(id: string): Promise<Armor | null> {
        return await Armor.findByPk(id);
    }

    async getArmorByName(name: string): Promise<Armor | null> {
        return await Armor.findOne({where: {name: name}})
    }

    async updateArmor(id: string, data: Partial<Armor>): Promise<Armor | null> {
        const armor = await Armor.findByPk(id);
        if (!armor) return null;
        await armor.update(data);
        return armor;
    }

    async deleteArmor(id: string): Promise<boolean> {
        let resp = false;
        const armor = await Armor.findByPk(id);
        if (armor) {
            await armor.destroy();
            resp = true;
        }
        return resp;
    }

}