import { Shield } from "../models/Shield";

export class ShieldRepository {
    async createShield(data: Partial<Shield>): Promise<Shield> {
        return await Shield.create(data as any);
    }

    async getAllShields(): Promise<Shield[]> {
        return await Shield.findAll();
    }

    async getShieldById(id: string): Promise<Shield | null> {
        return await Shield.findByPk(id);
    }

    async updateShield(id: string, data: Partial<Shield>): Promise<Shield | null> {
        const shield = await Shield.findByPk(id);
        if (!shield) return null;

        await shield.update(data);
        return shield;
    }

    async deleteShield(id: string): Promise<boolean> {
        const shield = await Shield.findByPk(id);
        if (!shield) return false;

        await shield.destroy();
        return true;
    }
}
