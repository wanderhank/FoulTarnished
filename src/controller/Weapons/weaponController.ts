import { Request, Response } from "express";
import WeaponService from "../../services/weapons/weaponService";

export class WeaponController {
    async createWeapon(req: Request, res: Response) {
        try {
            const {
                id,
                name,
                image,
                description,
                category,
                weight,
                attack,
                defence,
                requiredAttributes,
                scalesWith
            } = req.body;

            const weapon = await WeaponService.createWeapon(
                id,
                name,
                image,
                description,
                category,
                weight,
                attack,
                defence,
                requiredAttributes,
                scalesWith
            );

            return res.status(201).json(weapon);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar arma" });
        }
    }

    async getWeaponById(req: Request, res: Response) {
        try {
            const weapon = await WeaponService.getWeaponById(req.params.id);
            return weapon
                ? res.status(200).json(weapon)
                : res.status(404).json({ error: "Arma não encontrada" });
        } catch {
            return res.status(500).json({ error: "Erro ao buscar arma" });
        }
    }

    async getAllWeapons(req: Request, res: Response) {
        try {
            const weapons = await WeaponService.getAllWeapons();
            return res.status(200).json(weapons);
        } catch {
            return res.status(500).json({ error: "Erro ao buscar armas" });
        }
    }

    async updateWeapon(req: Request, res: Response) {
        try {
            const updated = await WeaponService.updateWeapon(req.params.id, req.body);
            return updated
                ? res.status(200).json(updated)
                : res.status(404).json({ error: "Arma não encontrada" });
        } catch {
            return res.status(500).json({ error: "Erro ao atualizar arma" });
        }
    }

    async deleteWeapon(req: Request, res: Response) {
        try {
            const success = await WeaponService.deleteWeapon(req.params.id);
            return success
                ? res.status(200).json({ message: "Arma excluída com sucesso" })
                : res.status(404).json({ error: "Arma não encontrada" });
        } catch {
            return res.status(500).json({ error: "Erro ao excluir arma" });
        }
    }
}

export default new WeaponController();
