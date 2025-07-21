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
const attackRepository_1 = require("../../repository/weapons/attackRepository");
const attackRepository = new attackRepository_1.AttackRepository();
class AttackService {
    createAttack(weaponId, name, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attackRepository.createAttack(weaponId, name, amount);
        });
    }
    getAttackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attackRepository.getAttackById(id);
        });
    }
    getAllAttacks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attackRepository.getAllAttacks();
        });
    }
    updateAttack(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attackRepository.updateAttack(id, data);
        });
    }
    deleteAttack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield attackRepository.deleteAttack(id);
        });
    }
}
exports.default = new AttackService();
