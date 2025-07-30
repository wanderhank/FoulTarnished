import { Request, Response } from "express";
import ShieldService from "../services/shieldService";

export class ShieldController {
    async createShield(req: Request, res: Response) {
        try {
            const data = req.body;

            const existing = await ShieldService.getShieldById(data.id);
            if (existing) {
                return res
                    .status(409)
                    .json({ error: "Shield com esse ID já existe." });
            }

            const shield = await ShieldService.createShield(data);
            return res.status(201).json(shield);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ erro: error.message });
            }
            return res.status(500).json({ erro: error });
        }
    }

    async getShieldById(req: Request, res: Response) {
        try {
            const shield = await ShieldService.getShieldById(req.params.id);
            if (!shield) {
                return res.status(404).json({ error: "Shield não encontrado." });
            }
            return res.status(200).json(shield);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar shield." });
        }
    }

    async getAllShields(res: Response) {
        try {
            const shields = await ShieldService.getAllShields();
            return res.status(200).json(shields);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar shields." });
        }
    }

    async updateShield(req: Request, res: Response) {
        try {


            const id = req.params.id;
            const data = req.body;

            const updated = await ShieldService.updateShield(id, data);
            if (!updated) {
                return res.status(404).json({ error: "Shield não encontrado." });
            }
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar shield." });
        }
    }

    async deleteShield(req: Request, res: Response) {
        try {


            const success = await ShieldService.deleteShield(req.params.id);
            if (!success) {
                return res.status(404).json({ error: "Shield não encontrado." });
            }
            return res.status(200).json({ message: "Shield excluído com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir shield." });
        }
    }
}



export default new ShieldController();
