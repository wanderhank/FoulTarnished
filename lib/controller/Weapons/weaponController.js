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
exports.WeaponController = void 0;
const weaponService_1 = require("../../services/weapons/weaponService");
class WeaponController {
    createWeapon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, image, description, category, weight, attack, defence, requiredAttributes, scalesWith } = req.body;
                const weapon = yield weaponService_1.default.createWeapon(id, name, image, description, category, weight, attack, defence, requiredAttributes, scalesWith);
                return res.status(201).json(weapon);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao criar arma" });
            }
        });
    }
    getWeaponById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const weapon = yield weaponService_1.default.getWeaponById(req.params.id);
                return weapon
                    ? res.status(200).json(weapon)
                    : res.status(404).json({ error: "Arma não encontrada" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar arma" });
            }
        });
    }
    getAllWeapons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const weapons = yield weaponService_1.default.getAllWeapons();
                return res.status(200).json(weapons);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar armas" });
            }
        });
    }
    updateWeapon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield weaponService_1.default.updateWeapon(req.params.id, req.body);
                return updated
                    ? res.status(200).json(updated)
                    : res.status(404).json({ error: "Arma não encontrada" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao atualizar arma" });
            }
        });
    }
    deleteWeapon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield weaponService_1.default.deleteWeapon(req.params.id);
                return success
                    ? res.status(200).json({ message: "Arma excluída com sucesso" })
                    : res.status(404).json({ error: "Arma não encontrada" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao excluir arma" });
            }
        });
    }
}
exports.WeaponController = WeaponController;
exports.default = new WeaponController();
