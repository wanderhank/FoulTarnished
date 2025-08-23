import {Admin} from "../models/Admin";


export class AdminRepository {
    async createAdmin(data: Partial<Admin>) {
        return await Admin.create(data as any);
    }

    async getAdminById(id: string) {
        return await Admin.findByPk(id);
    }

    async getAdminByEmail(email: string) {
        return await Admin.findOne({ where: { email } });
    }

    async getAllAdmins() {
        return await Admin.findAll();
    }

    async updateAdmin(id: string, data: Partial<{ name: string; email: string; password: string }>) {
        const admin = await Admin.findByPk(id);
        return admin ? await admin.update(data) : null;
    }

    async deleteAdmin(id: string) {
        const admin = await Admin.findByPk(id);
        if (admin) {
            await admin.destroy();
            return true;
        }
        return false;
    }

    async findByEmail(email: string) {
        return await Admin.findOne({ where: { email } });
    }

}
