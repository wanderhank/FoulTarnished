import {Router} from "express";
import {authenticate, authorize} from "../middlewares/authMiddleware";
import armorController from "../controller/armorController";
import {Shield} from "../models/Shield";

const router = Router();

router.post("/armors",authenticate, authorize, (request, response) => {armorController.createArmor(request, response)});

router.get("/armors/:id",  (request, response, next) => {armorController.getArmorById(request, response).catch(next)});

router.get("/armors", (_, response) => {armorController.getAllArmors(response)});

router.put("/armors/:id",authenticate, authorize, (request, response) => {armorController.updateArmor(request, response)});

router.delete("/armors/:id",authenticate, authorize, (request, response) => {armorController.deleteArmor(request, response)});

router.get("/armors", authenticate, async (request, response) => {
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
        return response.status(500).json({ error: "Erro ao buscar armaduras" });
    }
});

export default router;