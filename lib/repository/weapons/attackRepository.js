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
exports.AttackRepository = void 0;
const Attack_1 = require("../../models/Weapons/Attack");
class AttackRepository {
    createAttack(weaponId, name, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Attack_1.Attack.create({ weapon_id: weaponId, name, amount });
        });
    }
    getAttackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Attack_1.Attack.findByPk(id, {
                include: ['weapon']
            });
        });
    }
    getAllAttacks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Attack_1.Attack.findAll({
                include: ['weapon']
            });
        });
    }
    updateAttack(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const attack = yield Attack_1.Attack.findByPk(id);
            return attack ? yield attack.update(data) : null;
        });
    }
    deleteAttack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const attack = yield Attack_1.Attack.findByPk(id);
            if (attack) {
                yield attack.destroy();
                return true;
            }
            return false;
        });
    }
}
exports.AttackRepository = AttackRepository;
