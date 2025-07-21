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
exports.ScalingRepository = void 0;
const Scaling_1 = require("../../models/Weapons/Scaling");
class ScalingRepository {
    createScaling(weaponId, name, scaling) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Scaling_1.Scaling.create({ weapon_id: weaponId, name, scaling });
        });
    }
    getScalingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Scaling_1.Scaling.findByPk(id, {
                include: ['weapon']
            });
        });
    }
    getAllScalings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Scaling_1.Scaling.findAll({
                include: ['weapon']
            });
        });
    }
    updateScaling(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const scaling = yield Scaling_1.Scaling.findByPk(id);
            return scaling ? yield scaling.update(data) : null;
        });
    }
    deleteScaling(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const scaling = yield Scaling_1.Scaling.findByPk(id);
            if (scaling) {
                yield scaling.destroy();
                return true;
            }
            return false;
        });
    }
}
exports.ScalingRepository = ScalingRepository;
