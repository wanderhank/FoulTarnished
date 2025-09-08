import {AdminRepository} from "../repository/adminRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminController from "../controller/adminController";
import {ShieldAlreadyExistsError} from "../errors/ShieldAlreadyExistsError";
import {Admin} from "../models/Admin";
import {EmailAlreadyInUseError} from "../errors/ EmailAlreadyInUseError";
import {RequiredFieldsAreMissingError} from "../errors/RequiredFieldsAreMissingError";
import {Shield} from "../models/Shield";
import {ShieldNotFoundError} from "../errors/ShieldNotFoundError";
import {AdminNotFoundError} from "../errors/AdminNotFoundError";




export class AdminService {
    private adminRepository = new AdminRepository();
    private jwtSecret: jwt.Secret;

    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository;
        this.jwtSecret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;
    }


    // async createAdmin(name: string, email: string, password: string) {
    //     return await this.adminRepository.createAdmin(name, email, password);
    // }

    async createAdminCrypt(data: Partial<Admin>) {


        const { name, email, password } = data;

        const existing = await this.adminRepository.getAdminByEmail(<string>data.email);
        if (existing) {
            throw new EmailAlreadyInUseError();
        }

        if (hasEmptyRequiredFields(data)) {
            throw new RequiredFieldsAreMissingError();
        }
        const hashedPassword = await bcrypt.hash(<string>data.password, 10);
        data.password = hashedPassword;
        return await this.adminRepository.createAdmin(data);
    }

    async getAdminById(id: string) {
        const armor = await this.adminRepository.getAdminById(id);
        if (!armor) {
            throw new AdminNotFoundError();
        }
        return await this.adminRepository.getAdminById(id);
    }

    async getAdminByEmail(email: string) {
        return await this.adminRepository.getAdminByEmail(email);
    }

    async getAllAdmins() {
        return await this.adminRepository.getAllAdmins();
    }

    async updateAdmin(id: string, data: Partial<{ name: string; email: string; password: string }>) {
        const admin = await this.adminRepository.getAdminById(id);
        if (!admin) {
            throw new AdminNotFoundError();
        }
        return await this.adminRepository.updateAdmin(id, data);
    }

    async deleteAdmin(id: string) {
        const success = await this.adminRepository.deleteAdmin(id);
        if (!success) {
            throw new AdminNotFoundError();
        }
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

function hasEmptyRequiredFields(data: Partial<Admin>): boolean {

    const requiredKeys: (keyof Admin)[] = ["name", "email", "password"];
    return requiredKeys.some(key => {
        const value = data[key];
        return value === undefined || value === null || value === "";
    });
}

