import { Router } from "express";
import shieldController from "../controller/shieldController";
import {authenticate} from "../middlewares/authMiddleware";
import {Shield} from "../models/Shield";

const router = Router();

router.post("/shields",authenticate, (request, response) => {
    shieldController.createShield(request, response);
});

router.get("/shields/:id", (request, response) => {
    shieldController.getShieldById(request, response);
});

router.get("/shields", (_, response) => {
    shieldController.getAllShields(response);
});

router.put("/shields/:id", authenticate, (request, response) => {
    shieldController.updateShield(request, response);
});

router.delete("/shields/:id", authenticate, (request, response) => {
    shieldController.deleteShield(request, response);
});


router.get("/shields", async (request, response) => {
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
        return response.status(500).json({ error: "Erro ao buscar shields" });
    }
});

export default router;
