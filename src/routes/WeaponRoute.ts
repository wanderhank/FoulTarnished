import {Router} from "express";
import weaponController from "../controller/weaponController";

const router = Router();

router.post("/weapons", (request, response) => {weaponController.createWeapon(request, response)});

router.get("/weapons/:id",  (request, response) => {weaponController.getWeaponById(request, response)});

router.get("/weapons", (_, response) => {weaponController.getAllWeapons(response)});

router.put("/weapons/:id", (request, response) => {weaponController.updateWeapon(request, response)});

router.delete("/weapons/:id", (request, response) => {weaponController.deleteWeapon(request, response)});

export default router;
