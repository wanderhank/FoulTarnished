import ArmorService from "../services/armorService";
import { Request, Response } from "express";
import {ArmorNotFoundError} from "../errors/ArmorNotFoundError";
import {ArmorAlreadyExistsError} from "../errors/ArmorAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";

export class ArmorController {

    async createArmor(req: Request, res: Response) {
        try {
            const data = req.body;
            const armor = await ArmorService.createArmor(data);
            return res.status(201).json(armor);
        } catch (error: any) {
            if (error instanceof ArmorAlreadyExistsError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            if (error instanceof RequiredFieldsAreMissingError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({erro: error});
        }
    }

    async getArmorById(req: Request, res: Response) {
        try {
            const armor = await ArmorService.getArmorById(req.params.id);
            return res.status(200).json(armor);
        } catch (error: any) {
            if (error instanceof ArmorNotFoundError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro ao buscar armor." });
        }
    }

    async getAllArmors(res: Response) {
        try {
            const armors = await ArmorService.getAllArmors();
            return res.status(200).json(armors);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao buscar armadura." });
        }
    }

    async updateArmor(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await ArmorService.updateArmor(id, data);
            return res.status(200).json(updated);
        } catch (error: any) {
            if  (error instanceof ArmorNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao atualizar armadura." });
        }
    }

    async deleteArmor(req: Request, res: Response) {
        try {
            const success = await ArmorService.deleteArmor(req.params.id);
            return res.status(200).json({ message: "Armadura excluída com sucesso." });
        } catch (error: any) {
            if (error instanceof ArmorNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao excluir armadura." });
        }
    }
}



export default new ArmorController();
