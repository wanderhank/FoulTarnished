import { Admin } from "../models/Admin";
export declare class AdminRepository {
    createAdmin(name: string, email: string, password: string): Promise<Admin>;
    getAdminById(id: string): Promise<Admin | null>;
    getAdminByEmail(email: string): Promise<Admin | null>;
    getAllAdmins(): Promise<Admin[]>;
    updateAdmin(id: string, data: Partial<{
        name: string;
        email: string;
        password: string;
    }>): Promise<Admin | null>;
    deleteAdmin(id: string): Promise<boolean>;
}
