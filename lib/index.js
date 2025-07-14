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
const express = require("express");
const dotenv = require("dotenv");
const database_1 = require("./config/database");
const userRepository_1 = require("./repository/userRepository");
dotenv.config();
const app = express();
app.use(express.json());
const userRepo = new userRepository_1.UserRepository();
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield userRepo.createUser(name, email, password);
        res.json(user); // Retorna o usuário criado
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepo.getAllUsers();
        res.json(users); // Retorna todos os usuários
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
}));
// Testando a conexão e inicializando o servidor
database_1.default.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
