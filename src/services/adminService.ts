import {AdminRepository} from "../repository/adminRepository";


const adminRepository = new AdminRepository();

class AdminService {
    async createAdmin(name: string, email: string, password: string) {
        return await adminRepository.createAdmin(name, email, password);
    }

    async getAdminById(id: string) {
        return await adminRepository.getAdminById(id);
    }

    async getAdminByEmail(email: string) {
        return await adminRepository.getAdminByEmail(email);
    }

    async getAllAdmins() {
        return await adminRepository.getAllAdmins();
    }

    async updateAdmin(id: string, data: Partial<{ name: string; email: string; password: string }>) {
        return await adminRepository.updateAdmin(id, data);
    }

    async deleteAdmin(id: string) {
        return await adminRepository.deleteAdmin(id);
    }
}

export default new AdminService();
