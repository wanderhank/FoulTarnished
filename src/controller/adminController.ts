import { Request, Response } from "express";
import  { AdminService } from "../services/adminService";
import {AdminRepository} from "../repository/adminRepository";
import {ShieldAlreadyExistsError} from "../errors/ShieldAlreadyExistsError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {ShieldNotFoundError} from "../errors/ShieldNotFoundError";
import {AdminNotFoundError} from "../errors/AdminNotFoundError";


export class AdminController {
    private adminService: AdminService;
    constructor(adminService: AdminService) { this.adminService = adminService}

    async createAdmin(req: Request, res: Response) {
        try {
            const data = req.body;
            const admin = await this.adminService.createAdminCrypt(data);
            return res.status(201).json(admin);
        } catch (error: any) {
            if (error instanceof ShieldAlreadyExistsError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            if (error instanceof RequiredFieldsAreMissingError) {
                return res.status(error.statusCode).json({ error: error.message });
            }

            return res.status(500).json({erro: error});
        }
    }

    async getAdminById(req: Request, res: Response) {
        try {
            const admin = await this.adminService.getAdminById(req.params.id);
            return res.status(200).json(admin);
        } catch (error: any) {
            if (error instanceof AdminNotFoundError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro ao buscar administrador." });
        }
    }

    async getAllAdmins( res: Response) {
        try {
            const admins = await this.adminService.getAllAdmins();
            return res.status(200).json(admins);
        } catch (error: any) {
            return res.status(500).json({ error: "Erro ao buscar administrador." });
        }
    }


    async updateAdmin(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const updated = await this.adminService.updateAdmin(id, data);
            return res.status(200).json(updated);
        } catch (error: any) {
            if  (error instanceof AdminNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao atualizar administrador." });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const success = await this.adminService.deleteAdmin(req.params.id);

            return res.status(200).json({ message: "Admin excluído com sucesso." });
        } catch (error: any) {
            if (error instanceof AdminNotFoundError) {
                return res.status(error.statusCode).json({error: error.message})
            }
            return res.status(500).json({ error: "Erro ao excluir administrador." });
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
