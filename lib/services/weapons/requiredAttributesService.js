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
const defenceRepository_1 = require("../../repository/weapons/defenceRepository");
const requiredAttributeRepository = new defenceRepository_1.RequiredAttributeRepository();
class RequiredAttributeService {
    createRequiredAttribute(weaponId, name, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield requiredAttributeRepository.createRequiredAttribute(weaponId, name, amount);
        });
    }
    getRequiredAttributeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield requiredAttributeRepository.getRequiredAttributeById(id);
        });
    }
    getAllRequiredAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield requiredAttributeRepository.getAllRequiredAttributes();
        });
    }
    updateRequiredAttribute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield requiredAttributeRepository.updateRequiredAttribute(id, data);
        });
    }
    deleteRequiredAttribute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield requiredAttributeRepository.deleteRequiredAttribute(id);
        });
    }
}
exports.default = new RequiredAttributeService();
