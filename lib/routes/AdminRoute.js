"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const router = (0, express_1.Router)();
router.post("/users", (request, response) => { adminController_1.default.createAdmin(request, response); });
router.get("/users/:id", (request, response) => { adminController_1.default.getAdminById(request, response); });
router.get("/users", (_, response) => { adminController_1.default.getAllAdmins(response); });
router.put("/users/:id", (request, response) => { adminController_1.default.updateAdmin(request, response); });
router.delete("/users/:id", (request, response) => { adminController_1.default.deleteAdmin(request, response); });
exports.default = router;
