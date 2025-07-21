import { Router } from 'express';
import UserController from "../controller/userController";


const router = Router();

router.post("/users", (request, response) => {UserController.createUser(request, response)});

router.get("/users", (_, response) => {UserController.getAllUsers(response)});


router.get("/users/:id",  (request, response) => {UserController.getUserById(request, response)});

router.put("/users/:id", (request, response) => {UserController.updateUser(request, response)});

router.delete("/users/:id", (request, response) => {UserController.deleteUser(request, response)});

export default router;