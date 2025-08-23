import { Request, Response } from "express";
import TalismanService from "../services/talismanService";
import {TalismanAlreadyExistsError} from "../errors/TalismanAlreadyExistsError";
import {TalismanNotFoundError} from "../errors/TalismanNotFoundError";

export class TalismanController {

    async createTalisman(req: Request, res: Response) {
        try {
            const data = req.body;
            const armor = await TalismanService.createTalisman(data);
            return res.status(201).json(armor);
        } catch (error: any) {
            if (error instanceof TalismanAlreadyExistsError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            return res.status(500).json({erro: "Erro ao criar talismã."});
        }
    }

    async getTalismanById(req: Request, res: Response) {
        try {
            const armor = await TalismanService.getTalismanById(req.params.id);
            return res.status(200).json(armor);
        } catch (error) {
            if (error instanceof TalismanNotFoundError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            return res.status(500).json({ error: "Erro ao buscar talismã." });
        }
    }

    async getAllTalismans(res: Response) {
        try {
            const armors = await TalismanService.getAllTalismans();
            return res.status(200).json(armors);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao buscar talismã." });
        }
    }

    async updateTalisman(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await TalismanService.updateTalisman(id, data);
            return res.status(200).json(updated);
        } catch (error: any) {
            if (error instanceof TalismanNotFoundError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            return res.status(500).json({ error: "Erro ao atualizar talismã." });
        }
    }

    async deleteTalisman(req: Request, res: Response) {
        try {
            const success = await TalismanService.deleteTalisman(req.params.id);
            return res.status(200).json({ message: "talismã excluído com sucesso." });
        } catch (error: any) {
            if (error instanceof TalismanNotFoundError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            return res.status(500).json({ error: "Erro ao excluir armor." });
        }
    }
}

export default new TalismanController();
