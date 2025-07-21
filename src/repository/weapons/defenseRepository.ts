import {Defence} from "../../models/Weapons/Defense";


export class DefenceRepository {
    async createDefence(weaponId: string, name: string, amount: number) {
        return await Defence.create({ weapon_id: weaponId, name, amount });
    }

    async getDefenceById(id: number) {
        return await Defence.findByPk(id, {
            include: ['weapon']
        });
    }

    async getAllDefences() {
        return await Defence.findAll({
            include: ['weapon']
        });
    }

    async updateDefence(
        id: number,
        data: Partial<{ name: string; amount: number }>
    ) {
        const defence = await Defence.findByPk(id);
        return defence ? await defence.update(data) : null;
    }

    async deleteDefence(id: number) {
        const defence = await Defence.findByPk(id);
        if (defence) {
            await defence.destroy();
            return true;
        }
        return false;
    }
}
