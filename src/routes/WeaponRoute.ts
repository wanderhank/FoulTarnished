import {Router} from "express";
import weaponController from "../controller/weaponController";
import {authenticate, authorize} from "../middlewares/authMiddleware";

const router = Router();

router.post("/weapons",authenticate, (request, response) => {weaponController.createWeapon(request, response)});

router.get("/weapons/:id",  (request, response) => {weaponController.getWeaponById(request, response)});

router.get("/weapons", (_, response) => {weaponController.getAllWeapons(response)});

router.put("/weapons/:id",authenticate, authorize, (request, response) => {weaponController.updateWeapon(request, response)});

router.delete("/weapons/:id",authenticate, authorize, (request, response) => {weaponController.deleteWeapon(request, response)});

export default router;
