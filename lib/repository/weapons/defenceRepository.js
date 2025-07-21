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
exports.RequiredAttributeRepository = void 0;
const RequiredAttribute_1 = require("../../models/Weapons/RequiredAttribute");
class RequiredAttributeRepository {
    createRequiredAttribute(weaponId, name, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RequiredAttribute_1.RequiredAttribute.create({ weapon_id: weaponId, name, amount });
        });
    }
    getRequiredAttributeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RequiredAttribute_1.RequiredAttribute.findByPk(id, {
                include: ['weapon']
            });
        });
    }
    getAllRequiredAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RequiredAttribute_1.RequiredAttribute.findAll({
                include: ['weapon']
            });
        });
    }
    updateRequiredAttribute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const attribute = yield RequiredAttribute_1.RequiredAttribute.findByPk(id);
            return attribute ? yield attribute.update(data) : null;
        });
    }
    deleteRequiredAttribute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const attribute = yield RequiredAttribute_1.RequiredAttribute.findByPk(id);
            if (attribute) {
                yield attribute.destroy();
                return true;
            }
            return false;
        });
    }
}
exports.RequiredAttributeRepository = RequiredAttributeRepository;
