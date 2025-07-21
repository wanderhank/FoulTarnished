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
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.create({ name, email, password });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findByPk(id);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findAll();
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findByPk(id);
            return user ? yield user.update(data) : null;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = false;
            const user = yield User_1.User.findByPk(id);
            if (user) {
                yield user.destroy();
                resp = true;
            }
            return resp;
        });
    }
}
exports.UserRepository = UserRepository;
