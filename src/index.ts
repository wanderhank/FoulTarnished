import * as express from "express";
import * as dotenv from "dotenv";
import  sequelize from "./config/database";
import AdminRoute from "./routes/AdminRoute";
import WeaponRoute from "./routes/WeaponRoute";
import ShieldRoute from "./routes/ShieldRoute";
import authRoute from "./routes/AuthRoute";
import {authenticate} from "./middlewares/authMiddleware";
import TalismanRoute from "./routes/TalismanRoute";
import ArmorRoute from "./routes/ArmorRoute";
import BuildRoute from "./routes/BuildRoute";

dotenv.config();


const app = express();
app.use(express.json());
app.use(AdminRoute);
app.use(WeaponRoute);
app.use(ShieldRoute);
app.use(authRoute);
app.use(TalismanRoute);
app.use(ArmorRoute);
app.use(BuildRoute);

app.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route' });
});

sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
