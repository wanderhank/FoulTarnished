import {UserRepository} from "../repository/userRepository";
import {AdminRepository} from "../repository/adminRepository";
import {createECDH} from "node:crypto";

export interface Credencial  {
    email: string,
    password: string,
}

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();

export async function authUser(credencial: Credencial): Promise<boolean> {
    const user = await userRepository.getUserByEmail(credencial.email);
    return !!user && user.password === credencial.password;
}

export async function authAdmin(credencial: Credencial): Promise<boolean>{
    const admin = await adminRepository.getAdminByEmail(credencial.email);
    const authorized = !!admin && admin.password === credencial.password;
    return authorized ;
}

