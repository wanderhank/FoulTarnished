import {Weapon} from "../../models/Weapons/Weapon";
import {Attack} from "../../models/Weapons/Attack";
import {Defence} from "../../models/Weapons/Defense";
import {RequiredAttribute} from "../../models/Weapons/RequiredAttribute";
import {Scaling} from "../../models/Weapons/Scaling";

export class WeaponRepository {
    async createWeapon(
        id: string,
        name: string,
        image: string,
        description: string,
        category: string,
        weight: number,
        attack: { name: string; amount: number }[],
        defence: { name: string; amount: number }[],
        requiredAttributes: { name: string; amount: number }[],
        scalesWith: { name: string; scaling: string }[]
    ) {
        const weapon = await Weapon.create({ id, name, image, description, category, weight });

        await Promise.all([
            Attack.bulkCreate(attack.map(a => ({ weapon_id: id, name: a.name, amount: a.amount }))),
            Defence.bulkCreate(defence.map(d => ({ weapon_id: id, name: d.name, amount: d.amount }))),
            RequiredAttribute.bulkCreate(requiredAttributes.map(attr => ({ weapon_id: id, name: attr.name, amount: attr.amount }))),
            Scaling.bulkCreate(scalesWith.map(s => ({ weapon_id: id, name: s.name, scaling: s.scaling })))
        ]);

        return weapon;
    }

    async getWeaponById(id: string) {
        return await Weapon.findByPk(id, {
            include: ['attacks', 'defences', 'requiredAttributes', 'scalings'],
        });
    }

    async getAllWeapons() {
        return await Weapon.findAll({
            include: ['attacks', 'defences', 'requiredAttributes', 'scalings'],
        });
    }

    async updateWeapon(
        id: string,
        data: Partial<{
            name: string;
            image: string;
            description: string;
            category: string;
            weight: number;
        }>
    ) {
        const weapon = await Weapon.findByPk(id);
        return weapon ? await weapon.update(data) : null;
    }

    async deleteWeapon(id: string) {
        let deleted = false;
        const weapon = await Weapon.findByPk(id);
        if (weapon) {
            await Attack.destroy({ where: { weapon_id: id } });
            await Defence.destroy({ where: { weapon_id: id } });
            await RequiredAttribute.destroy({ where: { weapon_id: id } });
            await Scaling.destroy({ where: { weapon_id: id } });
            await weapon.destroy();
            deleted = true;
        }
        return deleted;
    }
}