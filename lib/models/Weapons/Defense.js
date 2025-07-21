"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Defence = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
const Weapon_1 = require("./Weapon");
class Defence extends sequelize_1.Model {
}
exports.Defence = Defence;
Defence.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    weapon_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'defences',
    modelName: 'Defence'
});
Defence.belongsTo(Weapon_1.Weapon, { foreignKey: 'weapon_id', as: 'weapon' });
