import  {Request, Response, Router} from 'express'
import {login} from "../services/authService";

const router = Router();
router.post('/login', login);
// router.post("/login", (request, response) => {adminController.login(request, response)});
export default router;
