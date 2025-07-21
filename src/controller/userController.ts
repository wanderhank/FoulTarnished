import { Request, Response } from 'express';
import userService from "../services/userService";

class userController {
    async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;
            const user = await userService.createUser(name, email, password);
            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar usuário" });
        }
    }

    async getUserById(request: Request, response: Response): Promise<Response> {
        try {
            const user = await userService.getUserById(parseInt(request.params.id));
            return !user
                ? response.status(404).json({ error: "Usuário não encontrado" })
                : response.status(200).json(user);
        } catch (error) {

            return response.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }


    async getAllUsers(response: Response): Promise<Response> {
        try {
            const users = await userService.getAllUsers();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await userService.updateUser(parseInt(request.params.id), request.body);

            return !user
                ? response.status(404).json({ error: 'Usuário não encontrado' })
                : response.status(200).json(user);
        } catch (error) {

            return response.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }


    async deleteUser(request: Request, response: Response): Promise<Response> {
        try {
            const success = await userService.deleteUser(parseInt(request.params.id));
            return !success
                ? response.status(404).json({ error: 'Usuário não encontrado' })
                : response.status(204).send();
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao excluir usuário' });
        }
    }
}

export default new userController();