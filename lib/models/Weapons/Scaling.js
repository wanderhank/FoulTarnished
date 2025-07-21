"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scaling = void 0;
const sequelize_1 = require("sequelize");
const Weapon_1 = require("./Weapon");
const database_1 = require("../../config/database");
class Scaling extends sequelize_1.Model {
}
exports.Scaling = Scaling;
Scaling.init({
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
    scaling: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'scalings',
    modelName: 'Scaling'
});
Scaling.belongsTo(Weapon_1.Weapon, { foreignKey: 'weapon_id', as: 'weapon' });
