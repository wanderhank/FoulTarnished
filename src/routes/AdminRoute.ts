import { Router } from 'express';
import UserController from "../controller/userController";
import adminController from "../controller/adminController";


const router = Router();

router.post("/admins", (request, response) => {adminController.createAdmin(request, response)});

router.get("/admins/:id",  (request, response) => {adminController.getAdminById(request, response)});

router.get("/admins", (_, response) => {adminController.getAllAdmins(response)});

router.put("/admins/:id", (request, response) => {adminController.updateAdmin(request, response)});

router.delete("/admins/:id", (request, response) => {adminController.deleteAdmin(request, response)});

export default router;