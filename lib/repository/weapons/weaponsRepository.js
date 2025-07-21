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
exports.WeaponRepository = void 0;
const Weapon_1 = require("../../models/Weapons/Weapon");
const Attack_1 = require("../../models/Weapons/Attack");
const Defense_1 = require("../../models/Weapons/Defense");
const RequiredAttribute_1 = require("../../models/Weapons/RequiredAttribute");
const Scaling_1 = require("../../models/Weapons/Scaling");
class WeaponRepository {
    createWeapon(id, name, image, description, category, weight, attack, defence, requiredAttributes, scalesWith) {
        return __awaiter(this, void 0, void 0, function* () {
            const weapon = yield Weapon_1.Weapon.create({ id, name, image, description, category, weight });
            yield Promise.all([
                Attack_1.Attack.bulkCreate(attack.map(a => ({ weapon_id: id, name: a.name, amount: a.amount }))),
                Defense_1.Defence.bulkCreate(defence.map(d => ({ weapon_id: id, name: d.name, amount: d.amount }))),
                RequiredAttribute_1.RequiredAttribute.bulkCreate(requiredAttributes.map(attr => ({ weapon_id: id, name: attr.name, amount: attr.amount }))),
                Scaling_1.Scaling.bulkCreate(scalesWith.map(s => ({ weapon_id: id, name: s.name, scaling: s.scaling })))
            ]);
            return weapon;
        });
    }
    getWeaponById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Weapon_1.Weapon.findByPk(id, {
                include: ['attacks', 'defences', 'requiredAttributes', 'scalings'],
            });
        });
    }
    getAllWeapons() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Weapon_1.Weapon.findAll({
                include: ['attacks', 'defences', 'requiredAttributes', 'scalings'],
            });
        });
    }
    updateWeapon(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const weapon = yield Weapon_1.Weapon.findByPk(id);
            return weapon ? yield weapon.update(data) : null;
        });
    }
    deleteWeapon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleted = false;
            const weapon = yield Weapon_1.Weapon.findByPk(id);
            if (weapon) {
                yield Attack_1.Attack.destroy({ where: { weapon_id: id } });
                yield Defense_1.Defence.destroy({ where: { weapon_id: id } });
                yield RequiredAttribute_1.RequiredAttribute.destroy({ where: { weapon_id: id } });
                yield Scaling_1.Scaling.destroy({ where: { weapon_id: id } });
                yield weapon.destroy();
                deleted = true;
            }
            return deleted;
        });
    }
}
exports.WeaponRepository = WeaponRepository;
