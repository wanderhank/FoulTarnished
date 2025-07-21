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
exports.ScalingController = void 0;
const scalingService_1 = require("../../services/weapons/scalingService");
class ScalingController {
    createScaling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { weaponId, name, scaling } = req.body;
                const result = yield scalingService_1.default.createScaling(weaponId, name, scaling);
                return res.status(201).json(result);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao criar scaling" });
            }
        });
    }
    getScalingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield scalingService_1.default.getScalingById(Number(req.params.id));
                return result
                    ? res.status(200).json(result)
                    : res.status(404).json({ error: "Scaling não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar scaling" });
            }
        });
    }
    getAllScalings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield scalingService_1.default.getAllScalings();
                return res.status(200).json(result);
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao buscar scalings" });
            }
        });
    }
    updateScaling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield scalingService_1.default.updateScaling(Number(req.params.id), req.body);
                return updated
                    ? res.status(200).json(updated)
                    : res.status(404).json({ error: "Scaling não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao atualizar scaling" });
            }
        });
    }
    deleteScaling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield scalingService_1.default.deleteScaling(Number(req.params.id));
                return success
                    ? res.status(200).json({ message: "Scaling excluído com sucesso" })
                    : res.status(404).json({ error: "Scaling não encontrado" });
            }
            catch (_a) {
                return res.status(500).json({ error: "Erro ao excluir scaling" });
            }
        });
    }
}
exports.ScalingController = ScalingController;
exports.default = new ScalingController();
