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
const defenseRepository_1 = require("../../repository/weapons/defenseRepository");
const defenceRepository = new defenseRepository_1.DefenceRepository();
class DefenceService {
    createDefence(weaponId, name, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield defenceRepository.createDefence(weaponId, name, amount);
        });
    }
    getDefenceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield defenceRepository.getDefenceById(id);
        });
    }
    getAllDefences() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield defenceRepository.getAllDefences();
        });
    }
    updateDefence(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield defenceRepository.updateDefence(id, data);
        });
    }
    deleteDefence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield defenceRepository.deleteDefence(id);
        });
    }
}
exports.default = new DefenceService();
