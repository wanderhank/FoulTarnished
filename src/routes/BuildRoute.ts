import {Router} from "express";
import {authenticate} from "../middlewares/authMiddleware";
import weaponController from "../controller/weaponController";
import buildController from "../controller/buildController";

const router = Router();
router.post("/builds",authenticate, (request, response) => {buildController.createBuild(request, response)});


export default router;