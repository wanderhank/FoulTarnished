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
exports.AdminRepository = void 0;
const Admin_1 = require("../models/Admin");
class AdminRepository {
    createAdmin(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.create({ name, email, password });
        });
    }
    getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findByPk(id);
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findOne({ where: { email } });
        });
    }
    getAllAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findAll();
        });
    }
    updateAdmin(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield Admin_1.Admin.findByPk(id);
            return admin ? yield admin.update(data) : null;
        });
    }
    deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield Admin_1.Admin.findByPk(id);
            if (admin) {
                yield admin.destroy();
                return true;
            }
            return false;
        });
    }
}
exports.AdminRepository = AdminRepository;
