import { Request, Response } from "express";
import DefenceService from "../../services/weapons/defenceService";

export class DefenceController {
    async createDefence(req: Request, res: Response) {
        try {
            const { weaponId, name, amount } = req.body;
            const defence = await DefenceService.createDefence(weaponId, name, amount);
            return res.status(201).json(defence);
        } catch {
            return res.status(500).json({ error: "Erro ao criar defesa" });
        }
    }

    async getDefenceById(req: Request, res: Response) {
        try {
            const defence = await DefenceService.getDefenceById(Number(req.params.id));
            return defence
                ? res.status(200).json(defence)
                : res.status(404).json({ error: "Defesa não encontrada" });
        } catch {
            return res.status(500).json({ error: "Erro ao buscar defesa" });
        }
    }

    async getAllDefences(req: Request, res: Response) {
        try {
            const defences = await DefenceService.getAllDefences();
            return res.status(200).json(defences);
        } catch {
            return res.status(500).json({ error: "Erro ao buscar defesas" });
        }
    }

    async updateDefence(req: Request, res: Response) {
        try {
            const updated = await DefenceService.updateDefence(Number(req.params.id), req.body);
            return updated
                ? res.status(200).json(updated)
                : res.status(404).json({ error: "Defesa não encontrada" });
        } catch {
            return res.status(500).json({ error: "Erro ao atualizar defesa" });
        }
    }

    async deleteDefence(req: Request, res: Response) {
        try {
            const success = await DefenceService.deleteDefence(Number(req.params.id));
            return success
                ? res.status(200).json({ message: "Defesa excluída com sucesso" })
                : res.status(404).json({ error: "Defesa não encontrada" });
        } catch {
            return res.status(500).json({ error: "Erro ao excluir defesa" });
        }
    }
}

export default new DefenceController();
