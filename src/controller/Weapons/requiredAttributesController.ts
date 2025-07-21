import { Request, Response } from "express";
import RequiredAttributesService from "../../services/weapons/requiredAttributesService";

export class RequiredAttributeController {
    async createRequiredAttribute(req: Request, res: Response) {
        try {
            const { weaponId, name, amount } = req.body;
            const attr = await RequiredAttributesService.createRequiredAttribute(weaponId, name, amount);
            return res.status(201).json(attr);
        } catch {
            return res.status(500).json({ error: "Erro ao criar atributo" });
        }
    }

    async getRequiredAttributeById(req: Request, res: Response) {
        try {
            const attr = await RequiredAttributesService.getRequiredAttributeById(Number(req.params.id));
            return attr
                ? res.status(200).json(attr)
                : res.status(404).json({ error: "Atributo não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao buscar atributo" });
        }
    }

    async getAllRequiredAttributes(req: Request, res: Response) {
        try {
            const list = await RequiredAttributesService.getAllRequiredAttributes();
            return res.status(200).json(list);
        } catch {
            return res.status(500).json({ error: "Erro ao buscar atributos" });
        }
    }

    async updateRequiredAttribute(req: Request, res: Response) {
        try {
            const updated = await RequiredAttributesService.updateRequiredAttribute(Number(req.params.id), req.body);
            return updated
                ? res.status(200).json(updated)
                : res.status(404).json({ error: "Atributo não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao atualizar atributo" });
        }
    }

    async deleteRequiredAttribute(req: Request, res: Response) {
        try {
            const success = await RequiredAttributesService.deleteRequiredAttribute(Number(req.params.id));
            return success
                ? res.status(200).json({ message: "Atributo excluído com sucesso" })
                : res.status(404).json({ error: "Atributo não encontrado" });
        } catch {
            return res.status(500).json({ error: "Erro ao excluir atributo" });
        }
    }
}

export default new RequiredAttributeController();
