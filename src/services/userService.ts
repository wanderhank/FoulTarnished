import {UserRepository} from "../repository/userRepository";


const userRepository = new UserRepository();

class UserService {
    async createUser(name: string, email: string, password: string) {
        return await userRepository.createUser(name, email, password);
    }

    async getUserById(id: number) {
        return await userRepository.getUserById(id);
    }

    // async getUserByEmail(email: string) {
    //     return await userRepository.getUserByEmail(email);
    // }

    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async updateUser(
        id: number,
        data: Partial<{ name: string; email: string; password: string }>
    ) {
        return await userRepository.updateUser(id, data);
    }

    async deleteUser(id: number) {
        return await userRepository.deleteUser(id);
    }
}

export default new UserService();
