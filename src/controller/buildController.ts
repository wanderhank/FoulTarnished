import {BuildArmor} from "../models/BuildArmor";
import {BuildTalisman} from "../models/BuildTalisman";
import {Request, Response} from "express";
import BuildService from "../services/buildService";

export class BuildController {
    async createBuild(req: Request, res: Response) {
        const {
            name,
            description,
            equipment1Id,
            equipment1Type,
            equipment2Id,
            equipment2Type,
            armors,
            talismans
        } = req.body;

        try {
            // Cria a build
            const build = await BuildService.createBuild({
                name,
                description,
                equipment1Id,
                equipment1Type,
                equipment2Id,
                equipment2Type
            });


            await BuildArmor.bulkCreate(
                armors.map((a: { armorId: number; slot: number }) => ({
                    buildId: build.id,
                    armorId: a.armorId,
                    slot: a.slot
                }))
            );

            await BuildTalisman.bulkCreate(
                talismans.map((t: { talismanId: number; slot: number }) => ({
                    buildId: build.id,
                    talismanId: t.talismanId,
                    slot: t.slot
                }))
            );

            return res.status(201).json({message: "Build criada com sucesso", buildId: build.id});
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Erro ao criar build"});
        }
    }

}

export default new BuildController();