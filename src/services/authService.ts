import {comparePassword, generateToken} from "../utils/auth";
import {findAdminByEmail} from "../models/Admin";
import {Request, Response} from "express";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Verifica se o usuário existe
        const user = await findAdminByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Usuário ou senha inválidos' });
        }
        // Compara a senha fornecida com a senha armazenada
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Usuário ou senha inválidos' });
        }
        // Gera um token JWT
        const token = generateToken(parseInt(user.id), user.email);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};