import {Router} from "express";
import weaponController from "../controller/weaponController";
import {authenticate, authorize} from "../middlewares/authMiddleware";
import {Shield} from "../models/Shield";

const router = Router();

router.post("/weapons",authenticate, (request, response) => {weaponController.createWeapon(request, response)});

router.get("/weapons/:id",  (request, response) => {weaponController.getWeaponById(request, response)});

router.get("/weapons", (_, response) => {weaponController.getAllWeapons(response)});

router.put("/weapons/:id",authenticate, authorize, (request, response) => {weaponController.updateWeapon(request, response)});

router.delete("/weapons/:id",authenticate, authorize, (request, response) => {weaponController.deleteWeapon(request, response)});

router.get("/weaponss", async (request, response) => {
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
        return response.status(500).json({ error: "Erro ao buscar armas" });
    }
});

export default router;
