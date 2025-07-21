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
exports.DefenceRepository = void 0;
const Defense_1 = require("../../models/Weapons/Defense");
class DefenceRepository {
    createDefence(weaponId, name, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Defense_1.Defence.create({ weapon_id: weaponId, name, amount });
        });
    }
    getDefenceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Defense_1.Defence.findByPk(id, {
                include: ['weapon']
            });
        });
    }
    getAllDefences() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Defense_1.Defence.findAll({
                include: ['weapon']
            });
        });
    }
    updateDefence(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const defence = yield Defense_1.Defence.findByPk(id);
            return defence ? yield defence.update(data) : null;
        });
    }
    deleteDefence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const defence = yield Defense_1.Defence.findByPk(id);
            if (defence) {
                yield defence.destroy();
                return true;
            }
            return false;
        });
    }
}
exports.DefenceRepository = DefenceRepository;
