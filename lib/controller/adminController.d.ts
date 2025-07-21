import { Request, Response } from "express";
export declare class AdminController {
    createAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAdminById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllAdmins(res: Response): Promise<Response<any, Record<string, any>>>;
    updateAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AdminController;
export default _default;
