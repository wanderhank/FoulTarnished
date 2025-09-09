import {Request, Response} from "express";

import BuildService from "../services/buildService";
import {BuildAlreadyExistsError} from "../errors/BuildAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {BuildNotFoundError} from "../errors/BuildNotFoundError";

export class BuildController {
    async createBuild(req: Request, res: Response) {
        try {
            const data = req.body;
            const armor = await BuildService.createBuild(data);
            return res.status(201).json(armor);
        } catch (error: any) {
            if (error instanceof BuildAlreadyExistsError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            if (error instanceof RequiredFieldsAreMissingError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            return res.status(500).json({erro: error});
        }
    }

    async getBuildById(req: Request, res: Response) {
        try {
            const armor = await BuildService.getBuildById(req.params.id);
            return res.status(200).json(armor);
        } catch (error: any) {
            if (error instanceof BuildNotFoundError) {
                return res.status(error.statusCode).json({error: error.message});
            }
            return res.status(500).json({error: "Erro ao buscar armor."});
        }
    }

    async getAllBuilds(res: Response) {
        try {
            const build = await BuildService.getAllBuilds();
            return res.status(200).json(build);
        } catch (error: any) {
            return res.status(500).json({error: "Erro ao buscar armadura."});
        }
    }

    async updateBuild(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await BuildService.updateBuild(id, data);
            return res.status(200).json(updated);
        } catch (error: any) {
            if (error instanceof BuildNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({error: "Erro ao atualizar armadura."});
        }
    }

    async deleteBuild(req: Request, res: Response) {
        try {
            const success = await BuildService.deleteBuild(req.params.id);
            return res.status(200).json({message: "Build excluída com sucesso."});
        } catch (error: any) {
            if (error instanceof BuildNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({error: "Erro ao excluir armadura."});
        }
    }
}

export default new BuildController();