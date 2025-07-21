import { Request, Response } from 'express';
declare class userController {
    createUser(request: Request, response: Response): Promise<Response>;
    getUserById(request: Request, response: Response): Promise<Response>;
    getAllUsers(response: Response): Promise<Response>;
    updateUser(request: Request, response: Response): Promise<Response>;
    deleteUser(request: Request, response: Response): Promise<Response>;
}
declare const _default: userController;
export default _default;
