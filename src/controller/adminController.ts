import { Request, Response } from "express";
import  { AdminService } from "../services/adminService";
import {AdminRepository} from "../repository/adminRepository";


export class AdminController {
    private adminService: AdminService;
    constructor(adminService: AdminService) { this.adminService = adminService}

    async createAdmin(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            const existing = await this.adminService.getAdminByEmail(email);
            if (existing) {
                return res.status(409).json({ error: "E-mail já está em uso." });
            }

            const admin = await this.adminService.createAdminCrypt(name, email, password);
            return res.status(201).json(admin);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Erro ao criar admin.", error:error });
        }
    }

    async getAdminById(req: Request, res: Response) {
        try {
            const admin = await this.adminService.getAdminById(req.params.id);
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
            const admins = await this.adminService.getAllAdmins();
            return res.status(200).json(admins);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar admins." });
        }
    }


    async updateAdmin(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await this.adminService.updateAdmin(id, data);
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
            const success = await this.adminService.deleteAdmin(req.params.id);
            if (!success) {
                return res.status(404).json({ error: "Admin não encontrado." });
            }
            return res.status(200).json({ message: "Admin excluído com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir admin." });
        }
    }

    async login(req: Request, res: Response): Promise<Response>{
        try {
            const {email, password} = req.body;
            const authResult = await this.adminService.authenticate(email, password);
            return res.json(authResult);

        } catch (error: any){
            return res.status(401).json({message: error.message});
        }
    }


}
 export default new AdminController(new AdminService(new AdminRepository));
