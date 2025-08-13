import {Router} from "express";
import {authenticate, authorize} from "../middlewares/authMiddleware";
import armorController from "../controller/armorController";

const router = Router();

router.post("/armors",authenticate, (request, response) => {armorController.createArmor(request, response)});

router.get("/armors/:id",  (request, response, next) => {armorController.getArmorById(request, response).catch(next)});

router.get("/armors", (_, response) => {armorController.getAllArmors(response)});

router.put("/armors/:id",authenticate, authorize, (request, response) => {armorController.updateArmor(request, response)});

router.delete("/armors/:id",authenticate, authorize, (request, response) => {armorController.deleteArmor(request, response)});

export default router;