declare class UserService {
    createUser(name: string, email: string, password: string): Promise<import("../models/User").User>;
    getUserById(id: number): Promise<import("../models/User").User | null>;
    getAllUsers(): Promise<import("../models/User").User[]>;
    updateUser(id: number, data: Partial<{
        name: string;
        email: string;
        password: string;
    }>): Promise<import("../models/User").User | null>;
    deleteUser(id: number): Promise<boolean>;
}
declare const _default: UserService;
export default _default;
