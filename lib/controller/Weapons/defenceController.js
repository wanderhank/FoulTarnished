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
exports.DefenceController = void 0;
const defenceService_1 = require("../../services/weapons/defenceService");
class DefenceController {
    createDefence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { weaponId, name, amount } = req.body;
                const defence = yield defenceService_1.default.createDefence(weaponId, name, amount);
                return res.status(201).json(defence);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao criar defesa" });
            }
        });
    }
    getDefenceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defence = yield defenceService_1.default.getDefenceById(Number(req.params.id));
                return defence
                    ? res.status(200).json(defence)
                    : res.status(404).json({ error: "Defesa não encontrada" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar defesa" });
            }
        });
    }
    getAllDefences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defences = yield defenceService_1.default.getAllDefences();
                return res.status(200).json(defences);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar defesas" });
            }
        });
    }
    updateDefence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield defenceService_1.default.updateDefence(Number(req.params.id), req.body);
                return updated
                    ? res.status(200).json(updated)
                    : res.status(404).json({ error: "Defesa não encontrada" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao atualizar defesa" });
            }
        });
    }
    deleteDefence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield defenceService_1.default.deleteDefence(Number(req.params.id));
                return success
                    ? res.status(200).json({ message: "Defesa excluída com sucesso" })
                    : res.status(404).json({ error: "Defesa não encontrada" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao excluir defesa" });
            }
        });
    }
}
exports.DefenceController = DefenceController;
exports.default = new DefenceController();
