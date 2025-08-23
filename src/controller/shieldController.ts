import { Request, Response } from "express";
import ShieldService from "../services/shieldService";
import {ShieldAlreadyExistsError} from "../errors/ShieldAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {ShieldNotFoundError} from "../errors/ShieldNotFoundError";

export class ShieldController {

    async createShield(req: Request, res: Response) {
        try {
            const data = req.body;
            const armor = await ShieldService.createShield(data);
            return res.status(201).json(armor);
        } catch (error: any) {
            if (error instanceof ShieldAlreadyExistsError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            if (error instanceof RequiredFieldsAreMissingError) {
                return res.status(error.statusCode).json({ error: error.message });
            }

            return res.status(500).json({erro: error});
        }
    }

    async getShieldById(req: Request, res: Response) {
        try {
            const armor = await ShieldService.getShieldById(req.params.id);
            return res.status(200).json(armor);
        } catch (error: any) {
            if (error instanceof ShieldNotFoundError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro ao buscar escudo." });
        }
    }

    async getAllShields(res: Response) {
        try {
            const armors = await ShieldService.getAllShields();
            return res.status(200).json(armors);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao buscar escudo." });
        }
    }

    async updateShield(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await ShieldService.updateShield(id, data);
            return res.status(200).json(updated);
        } catch (error: any) {
            if  (error instanceof ShieldNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao atualizar escudo." });
        }
    }

    async deleteShield(req: Request, res: Response) {
        try {
            const success = await ShieldService.deleteShield(req.params.id);
            return res.status(200).json({ message: "Escudo excluído com sucesso." });
        } catch (error: any) {
            if (error instanceof ShieldNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao excluir escudo." });
        }
    }
}

export default new ShieldController();
