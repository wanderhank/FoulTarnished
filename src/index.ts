import * as express from "express";
import * as dotenv from "dotenv";
import  sequelize from "./config/database";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import WeaponRoute from "./routes/WeaponRoute";


dotenv.config();


const app = express();
app.use(express.json());
app.use(UserRoute);
app.use(AdminRoute);
app.use(WeaponRoute);

sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
