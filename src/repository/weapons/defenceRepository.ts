import {RequiredAttribute} from "../../models/Weapons/RequiredAttribute";


export class RequiredAttributeRepository {
    async createRequiredAttribute(weaponId: string, name: string, amount: number) {
        return await RequiredAttribute.create({ weapon_id: weaponId, name, amount });
    }

    async getRequiredAttributeById(id: number) {
        return await RequiredAttribute.findByPk(id, {
            include: ['weapon']
        });
    }

    async getAllRequiredAttributes() {
        return await RequiredAttribute.findAll({
            include: ['weapon']
        });
    }

    async updateRequiredAttribute(
        id: number,
        data: Partial<{ name: string; amount: number }>
    ) {
        const attribute = await RequiredAttribute.findByPk(id);
        return attribute ? await attribute.update(data) : null;
    }

    async deleteRequiredAttribute(id: number) {
        const attribute = await RequiredAttribute.findByPk(id);
        if (attribute) {
            await attribute.destroy();
            return true;
        }
        return false;
    }
}
