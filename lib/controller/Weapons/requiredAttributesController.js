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
exports.RequiredAttributeController = void 0;
const requiredAttributesService_1 = require("../../services/weapons/requiredAttributesService");
class RequiredAttributeController {
    createRequiredAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { weaponId, name, amount } = req.body;
                const attr = yield requiredAttributesService_1.default.createRequiredAttribute(weaponId, name, amount);
                return res.status(201).json(attr);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao criar atributo" });
            }
        });
    }
    getRequiredAttributeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attr = yield requiredAttributesService_1.default.getRequiredAttributeById(Number(req.params.id));
                return attr
                    ? res.status(200).json(attr)
                    : res.status(404).json({ error: "Atributo não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar atributo" });
            }
        });
    }
    getAllRequiredAttributes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield requiredAttributesService_1.default.getAllRequiredAttributes();
                return res.status(200).json(list);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar atributos" });
            }
        });
    }
    updateRequiredAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield requiredAttributesService_1.default.updateRequiredAttribute(Number(req.params.id), req.body);
                return updated
                    ? res.status(200).json(updated)
                    : res.status(404).json({ error: "Atributo não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao atualizar atributo" });
            }
        });
    }
    deleteRequiredAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield requiredAttributesService_1.default.deleteRequiredAttribute(Number(req.params.id));
                return success
                    ? res.status(200).json({ message: "Atributo excluído com sucesso" })
                    : res.status(404).json({ error: "Atributo não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao excluir atributo" });
            }
        });
    }
}
exports.RequiredAttributeController = RequiredAttributeController;
exports.default = new RequiredAttributeController();
