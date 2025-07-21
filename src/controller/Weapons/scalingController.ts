import { Request, Response } from "express";
import ScalingService from "../../services/weapons/scalingService";


export class ScalingController {
    async createScaling(req: Request, res: Response) {
        try {
            const { weaponId, name, scaling } = req.body;
            const result = await ScalingService.createScaling(weaponId, name, scaling);
            return res.status(201).json(result);
        } catch {
            return res.status(500).json({ error: "Erro ao criar scaling" });
        }
    }

    async getScalingById(req: Request, res: Response) {
        try {
            const result = await ScalingService.getScalingById(Number(req.params.id));
            return result
                ? res.status(200).json(result)
                : res.status(404).json({ error: "Scaling não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao buscar scaling" });
        }
    }

    async getAllScalings(req: Request, res: Response) {
        try {
            const result = await ScalingService.getAllScalings();
            return res.status(200).json(result);
        } catch {
            return res.status(500).json({ error: "Erro ao buscar scalings" });
        }
    }

    async updateScaling(req: Request, res: Response) {
        try {
            const updated = await ScalingService.updateScaling(Number(req.params.id), req.body);
            return updated
                ? res.status(200).json(updated)
                : res.status(404).json({ error: "Scaling não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao atualizar scaling" });
        }
    }

    async deleteScaling(req: Request, res: Response) {
        try {
            const success = await ScalingService.deleteScaling(Number(req.params.id));
            return success
                ? res.status(200).json({ message: "Scaling excluído com sucesso" })
                : res.status(404).json({ error: "Scaling não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao excluir scaling" });
        }
    }
}

export default new ScalingController();
