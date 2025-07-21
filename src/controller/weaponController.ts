import { Request, Response } from "express";
import WeaponService from "../services/weaponService";
import {authAdmin, Credencial} from "../utils/auth";

export class WeaponController {

    async createWeapon(req: Request, res: Response) {
        try {
            const authorized = await auth(req);
            if (!authorized) return res.status(401).json({error: "Não Autorizado"});
            const data = req.body;

            const existing = await WeaponService.getWeaponById(data.id);
            if (existing) {
                return res.status(409).json({ error: "Weapon com esse ID já existe." });
            }
            const weapon = await WeaponService.createWeapon(data);
            return res.status(201).json(weapon);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({erro: error.message});
            }
            return res.status(500).json({erro: error});

        }
    }

    async getWeaponById(req: Request, res: Response) {
        try {

            const weapon = await WeaponService.getWeaponById(req.params.id);
            if (!weapon) {
                return res.status(404).json({ error: "Weapon não encontrado." });
            }
            return res.status(200).json(weapon);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar weapon." });
        }
    }

    async getAllWeapons(res: Response) {
        try {
            const weapons = await WeaponService.getAllWeapons();
            return res.status(200).json(weapons);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar weapons." });
        }
    }

    async updateWeapon(req: Request, res: Response) {
        try {
            if (!auth(req)) return res.status(401).json({error: "Não Autorizado"})
            const id = req.params.id;
            const data = req.body;

            const updated = await WeaponService.updateWeapon(id, data);
            if (!updated) {
                return res.status(404).json({ error: "Weapon não encontrado." });
            }
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar weapon." });
        }
    }

    async deleteWeapon(req: Request, res: Response) {
        try {

            if (!auth(req)) return res.status(401).json({error: "Não Autorizado"})
            const success = await WeaponService.deleteWeapon(req.params.id);
            if (!success) {
                return res.status(404).json({ error: "Weapon não encontrado." });
            }
            return res.status(200).json({ message: "Weapon excluído com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir weapon." });
        }
    }


}

function auth(req: Request): Promise<boolean> {
    const emailHeader = req.headers["email"];
    const passwordHeader = req.headers["password"];

    const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader;
    const password = Array.isArray(passwordHeader) ? passwordHeader[0] : passwordHeader;

    if (!email || !password) {
        return Promise.resolve(false);
    }

    const credencial: Credencial = { email, password };

    return authAdmin(credencial);
}

export default new WeaponController();
