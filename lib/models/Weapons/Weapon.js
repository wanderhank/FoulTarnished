"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
class Weapon extends sequelize_1.Model {
}
exports.Weapon = Weapon;
Weapon.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'weapons',
    modelName: 'Weapon'
});
