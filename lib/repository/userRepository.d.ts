import { User } from "../models/User";
export declare class UserRepository {
    createUser(name: string, email: string, password: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
