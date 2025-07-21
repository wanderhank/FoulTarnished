import { Request, Response } from "express";
import AttackService from "../../services/weapons/attackService";

export class AttackController {
    async createAttack(req: Request, res: Response) {
        try {
            const { weaponId, name, amount } = req.body;
            const attack = await AttackService.createAttack(weaponId, name, amount);
            return res.status(201).json(attack);
        } catch {
            return res.status(500).json({ error: "Erro ao criar ataque" });
        }
    }

    async getAttackById(req: Request, res: Response) {
        try {
            const attack = await AttackService.getAttackById(Number(req.params.id));
            return attack
                ? res.status(200).json(attack)
                : res.status(404).json({ error: "Ataque não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao buscar ataque" });
        }
    }

    async getAllAttacks(req: Request, res: Response) {
        try {
            const attacks = await AttackService.getAllAttacks();
            return res.status(200).json(attacks);
        } catch {
            return res.status(500).json({ error: "Erro ao buscar ataques" });
        }
    }

    async updateAttack(req: Request, res: Response) {
        try {
            const updated = await AttackService.updateAttack(Number(req.params.id), req.body);
            return updated
                ? res.status(200).json(updated)
                : res.status(404).json({ error: "Ataque não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao atualizar ataque" });
        }
    }

    async deleteAttack(req: Request, res: Response) {
        try {
            const success = await AttackService.deleteAttack(Number(req.params.id));
            return success
                ? res.status(200).json({ message: "Ataque excluído com sucesso" })
                : res.status(404).json({ error: "Ataque não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao excluir ataque" });
        }
    }
}

export default new AttackController();
