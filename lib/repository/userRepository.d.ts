import { User } from "../models/User";
export declare class UserRepository {
    createUser(name: string, email: string, password: string): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, data: Partial<{
        name: string;
        email: string;
        password: string;
    }>): Promise<User | null>;
    deleteUser(id: number): Promise<boolean>;
}
