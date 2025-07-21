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
const weaponsRepository_1 = require("../../repository/weapons/weaponsRepository");
const weaponRepository = new weaponsRepository_1.WeaponRepository();
class WeaponService {
    createWeapon(id, name, image, description, category, weight, attack, defence, requiredAttributes, scalesWith) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield weaponRepository.createWeapon(id, name, image, description, category, weight, attack, defence, requiredAttributes, scalesWith);
        });
    }
    getWeaponById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield weaponRepository.getWeaponById(id);
        });
    }
    getAllWeapons() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield weaponRepository.getAllWeapons();
        });
    }
    updateWeapon(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield weaponRepository.updateWeapon(id, data);
        });
    }
    deleteWeapon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield weaponRepository.deleteWeapon(id);
        });
    }
}
exports.default = new WeaponService();
