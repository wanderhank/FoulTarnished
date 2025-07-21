"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
class userController {
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = request.body;
                const user = yield userService_1.default.createUser(name, email, password);
                return response.status(201).json(user);
            }
            catch (error) {
                return response.status(500).json({ error: "Erro ao criar usuário" });
            }
        });
    }
    getUserById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService_1.default.getUserById(parseInt(request.params.id));
                return !user
                    ? response.status(404).json({ error: "Usuário não encontrado" })
                    : response.status(200).json(user);
            }
            catch (error) {
                console.log(request.params.id);
                return response.status(500).json({ error: "Erro ao buscar usuário" });
            }
        });
    }
    getAllUsers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getAllUsers();
                return response.status(200).json(users);
            }
            catch (error) {
                return response.status(500).json({ error: 'Erro ao listar usuários' });
            }
        });
    }
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService_1.default.updateUser(parseInt(request.params.id), request.body);
                return !user
                    ? response.status(404).json({ error: 'Usuário não encontrado' })
                    : response.status(200).json(user);
            }
            catch (error) {
                return response.status(500).json({ error: 'Erro ao atualizar usuário' });
            }
        });
    }
    deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield userService_1.default.deleteUser(parseInt(request.params.id));
                return !success
                    ? response.status(404).json({ error: 'Usuário não encontrado' })
                    : response.status(204).send();
            }
            catch (error) {
                return response.status(500).json({ error: 'Erro ao excluir usuário' });
            }
        });
    }
}
exports.default = new userController();
