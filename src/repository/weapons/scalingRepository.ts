import {Scaling} from "../../models/Weapons/Scaling";


export class ScalingRepository {
    async createScaling(weaponId: string, name: string, scaling: string) {
        return await Scaling.create({ weapon_id: weaponId, name, scaling });
    }

    async getScalingById(id: number) {
        return await Scaling.findByPk(id, {
            include: ['weapon']
        });
    }

    async getAllScalings() {
        return await Scaling.findAll({
            include: ['weapon']
        });
    }

    async updateScaling(
        id: number,
        data: Partial<{ name: string; scaling: string }>
    ) {
        const scaling = await Scaling.findByPk(id);
        return scaling ? await scaling.update(data) : null;
    }

    async deleteScaling(id: number) {
        const scaling = await Scaling.findByPk(id);
        if (scaling) {
            await scaling.destroy();
            return true;
        }
        return false;
    }
}
