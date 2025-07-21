"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const database_1 = require("./config/database");
const UserRoute_1 = require("./routes/UserRoute");
dotenv.config();
const app = express();
app.use(express.json());
app.use(UserRoute_1.default);
database_1.default.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
