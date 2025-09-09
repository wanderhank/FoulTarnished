import { Router } from 'express';
import buildController from "../controller/buildController";


const router = Router();

router.post("/builds", (request, response) => {buildController.createBuild(request, response)});

router.get("/builds/:id",  (request, response) => {buildController.getBuildById(request, response)});

router.get("/builds", (_, response) => {buildController.getAllBuilds(response)});

router.put("/builds/:id", (request, response) => {buildController.updateBuild(request, response)});

router.delete("/builds/:id", (request, response) => {buildController.deleteBuild(request, response)});

export default router;