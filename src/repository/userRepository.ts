import {User} from "../models/User";


export class UserRepository {

    async createUser(name: string, email: string, password: string) {
        return await User.create({ name, email, password });
    }

    async getUserById(id: number) {
        return await User.findByPk(id);
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async updateUser(id: number, data: Partial<{ name: string; email: string; password: string }>) {
        const user = await User.findByPk(id);
        return user ? await user!.update(data) : null;
    }

    async deleteUser(id: number) {
        let resp = false;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            resp = true;
        }
        return resp;
    }
}

