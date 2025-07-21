import { Router } from "express";
import shieldController from "../controller/shieldController";

const router = Router();

router.post("/shields", (request, response) => {
    shieldController.createShield(request, response);
});

router.get("/shields/:id", (request, response) => {
    shieldController.getShieldById(request, response);
});

router.get("/shields", (_, response) => {
    shieldController.getAllShields(response);
});

router.put("/shields/:id", (request, response) => {
    shieldController.updateShield(request, response);
});

router.delete("/shields/:id", (request, response) => {
    shieldController.deleteShield(request, response);
});

export default router;
