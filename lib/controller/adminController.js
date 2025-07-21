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
exports.AdminController = void 0;
const adminService_1 = require("../services/adminService");
class AdminController {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const existing = yield adminService_1.default.getAdminByEmail(email);
                if (existing) {
                    return res.status(409).json({ error: "E-mail já está em uso." });
                }
                const admin = yield adminService_1.default.createAdmin(name, email, password);
                return res.status(201).json(admin);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao criar admin." });
            }
        });
    }
    getAdminById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield adminService_1.default.getAdminById(req.params.id);
                if (!admin) {
                    return res.status(404).json({ error: "Admin não encontrado." });
                }
                return res.status(200).json(admin);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao buscar admin." });
            }
        });
    }
    getAllAdmins(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield adminService_1.default.getAllAdmins();
                return res.status(200).json(admins);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao buscar admins." });
            }
        });
    }
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = req.body;
                const updated = yield adminService_1.default.updateAdmin(id, data);
                if (!updated) {
                    return res.status(404).json({ error: "Admin não encontrado." });
                }
                return res.status(200).json(updated);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao atualizar admin." });
            }
        });
    }
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield adminService_1.default.deleteAdmin(req.params.id);
                if (!success) {
                    return res.status(404).json({ error: "Admin não encontrado." });
                }
                return res.status(200).json({ message: "Admin excluído com sucesso." });
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao excluir admin." });
            }
        });
    }
}
exports.AdminController = AdminController;
exports.default = new AdminController();
