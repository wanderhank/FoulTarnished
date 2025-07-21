declare class AdminService {
    createAdmin(name: string, email: string, password: string): Promise<import("../models/Admin").Admin>;
    getAdminById(id: string): Promise<import("../models/Admin").Admin | null>;
    getAdminByEmail(email: string): Promise<import("../models/Admin").Admin | null>;
    getAllAdmins(): Promise<import("../models/Admin").Admin[]>;
    updateAdmin(id: string, data: Partial<{
        name: string;
        email: string;
        password: string;
    }>): Promise<import("../models/Admin").Admin | null>;
    deleteAdmin(id: string): Promise<boolean>;
}
declare const _default: AdminService;
export default _default;
