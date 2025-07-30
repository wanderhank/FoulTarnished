import {AdminRepository} from "../repository/adminRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminController from "../controller/adminController";




export class AdminService {
    private adminRepository = new AdminRepository();
    private jwtSecret: jwt.Secret;

    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository;
        this.jwtSecret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;
    }


    async createAdmin(name: string, email: string, password: string) {
        return await this.adminRepository.createAdmin(name, email, password);
    }

    async createAdminCrypt(name: string, email: string, password: string) {

        const hashedPassword = await bcrypt.hash(password, 10);

        return await this.adminRepository.createAdmin(name, email, hashedPassword);
    }

    async getAdminById(id: string) {
        return await this.adminRepository.getAdminById(id);
    }

    async getAdminByEmail(email: string) {
        return await this.adminRepository.getAdminByEmail(email);
    }

    async getAllAdmins() {
        return await this.adminRepository.getAllAdmins();
    }

    async updateAdmin(id: string, data: Partial<{ name: string; email: string; password: string }>) {
        return await this.adminRepository.updateAdmin(id, data);
    }

    async deleteAdmin(id: string) {
        return await this.adminRepository.deleteAdmin(id);
    }

    async authenticate(email: string, password: string) {

        const user = await this.adminRepository.findByEmail(email);
        if (!user) throw new Error("Usuário ou senha inválidos");

        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) throw new Error("Usuário ou senha inválidos");

        const payload = { id: user.id, email: user.email };

        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });

        return { user, token };
    }
}

