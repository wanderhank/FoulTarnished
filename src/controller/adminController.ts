import { Request, Response } from "express";
import AdminService from "../services/adminService";
import userService from "../services/userService";

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            const existing = await AdminService.getAdminByEmail(email);
            if (existing) {
                return res.status(409).json({ error: "E-mail já está em uso." });
            }

            const admin = await AdminService.createAdmin(name, email, password);
            return res.status(201).json(admin);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar admin." });
        }
    }

    async getAdminById(req: Request, res: Response) {
        try {
            const admin = await AdminService.getAdminById(req.params.id);
            if (!admin) {
                return res.status(404).json({ error: "Admin não encontrado." });
            }
            return res.status(200).json(admin);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar admin." });
        }
    }

    async getAllAdmins( res: Response) {
        try {
            const admins = await AdminService.getAllAdmins();
            return res.status(200).json(admins);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar admins." });
        }
    }


    async updateAdmin(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await AdminService.updateAdmin(id, data);
            if (!updated) {
                return res.status(404).json({ error: "Admin não encontrado." });
            }
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar admin." });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const success = await AdminService.deleteAdmin(req.params.id);
            if (!success) {
                return res.status(404).json({ error: "Admin não encontrado." });
            }
            return res.status(200).json({ message: "Admin excluído com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir admin." });
        }
    }
}

export default new AdminController();
