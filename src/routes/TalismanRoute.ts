import talismanController from "../controller/talismanController";
import {authenticate, authorize} from "../middlewares/authMiddleware";
import {Router} from "express";



const router = Router();

router.post("/talismans",authenticate, (request, response) => {talismanController.createTalisman(request, response)});

router.get("/talismans/:id",  (request, response) => {talismanController.getTalismanById(request, response)});

router.get("/talismans", (_, response) => {talismanController.getAllTalismans(response)});

router.put("/talismans/:id",authenticate, authorize, (request, response) => {talismanController.updateTalisman(request, response)});

router.delete("/talismans/:id",authenticate, authorize, (request, response) => {talismanController.deleteTalisman(request, response)});

export default router;