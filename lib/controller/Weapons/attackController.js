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
exports.AttackController = void 0;
const attackService_1 = require("../../services/weapons/attackService");
class AttackController {
    createAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { weaponId, name, amount } = req.body;
                const attack = yield attackService_1.default.createAttack(weaponId, name, amount);
                return res.status(201).json(attack);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao criar ataque" });
            }
        });
    }
    getAttackById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attack = yield attackService_1.default.getAttackById(Number(req.params.id));
                return attack
                    ? res.status(200).json(attack)
                    : res.status(404).json({ error: "Ataque não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar ataque" });
            }
        });
    }
    getAllAttacks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attacks = yield attackService_1.default.getAllAttacks();
                return res.status(200).json(attacks);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar ataques" });
            }
        });
    }
    updateAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield attackService_1.default.updateAttack(Number(req.params.id), req.body);
                return updated
                    ? res.status(200).json(updated)
                    : res.status(404).json({ error: "Ataque não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao atualizar ataque" });
            }
        });
    }
    deleteAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield attackService_1.default.deleteAttack(Number(req.params.id));
                return success
                    ? res.status(200).json({ message: "Ataque excluído com sucesso" })
                    : res.status(404).json({ error: "Ataque não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao excluir ataque" });
            }
        });
    }
}
exports.AttackController = AttackController;
exports.default = new AttackController();
