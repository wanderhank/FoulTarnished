import { Request, Response } from "express";
import weaponService, {WeaponService} from "../services/weaponService";
import {WeaponNotFoundError} from "../errors/WeaponNotFoundError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {WeaponAlreadyExistsError} from "../errors/WeaponAlreadyExistsError";

export class WeaponController {

    async createWeapon(req: Request, res: Response) {
        try {
            const data = req.body;
            const armor = await weaponService.createWeapon(data);
            return res.status(201).json(armor);
        } catch (error: any) {
            if (error instanceof WeaponAlreadyExistsError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            if (error instanceof RequiredFieldsAreMissingError) {
                return res.status(error.statusCode).json({ error: error.message });
            }

            return res.status(500).json({erro: error});
        }
    }

    async getWeaponById(req: Request, res: Response) {
        try {
            const armors = await weaponService.getAllWeapons();
            return res.status(200).json(armors);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao buscar arma." });
        }
    }

    async getAllWeapons(res: Response) {
        try {
            const weapons = await weaponService.getAllWeapons();
            return res.status(200).json(weapons);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar weapons." });
        }
    }

    async updateWeapon(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await weaponService.updateWeapon(id, data);
            return res.status(200).json(updated);
        } catch (error: any) {
            if  (error instanceof WeaponNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao atualizar arma." });
        }
    }

    async deleteWeapon(req: Request, res: Response) {

        try {
            const success = await weaponService.deleteWeapon(req.params.id);
            return res.status(200).json({ message: "Escudo excluído com sucesso." });
        } catch (error: any) {
            if (error instanceof WeaponNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao excluir arma." });
        }
    }


}



export default new WeaponController();
