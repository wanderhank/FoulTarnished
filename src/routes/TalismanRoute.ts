import talismanController from "../controller/talismanController";
import {authenticate, authorize} from "../middlewares/authMiddleware";
import {Router} from "express";
import {Shield} from "../models/Shield";



const router = Router();

router.post("/talismans",authenticate,authorize, (request, response) => {talismanController.createTalisman(request, response)});

router.get("/talismans/:id",  (request, response) => {talismanController.getTalismanById(request, response)});

router.get("/talismans", (_, response) => {talismanController.getAllTalismans(response)});

router.put("/talismans/:id",authenticate, authorize, (request, response) => {talismanController.updateTalisman(request, response)});

router.delete("/talismans/:id",authenticate, authorize, (request, response) => {talismanController.deleteTalisman(request, response)});

router.get("/talismans", async (request, response) => {
    try {
        const page = parseInt(request.query.page as string) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        const { rows: data, count: total } = await Shield.findAndCountAll({
            limit,
            offset,
        });

        return response.json({
            totalPages: Math.ceil(total / limit),
            data,
            total,
            page,
        });

    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Erro ao buscar talismãs" });
    }
});

export default router;