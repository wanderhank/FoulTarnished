import {verifyToken} from "../utils/auth";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {role} from "../models/Admin";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }
    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded; // Adiciona o usuário decodificado ao objeto `req`
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token Inválido.' });
    }
}

export const authorize: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);

    const token = request.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        response.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = verifyToken(token) as { id: number, username: string, role: role };
        console.log("Decoded token:", decoded);
        if (decoded.role === "Admin") {
            (request as any).user = decoded;
            return next();
        }

        if (decoded.role === "User" && decoded.id == id) {
            (request as any).user = decoded;
            next();
        }
        return response.status(403).json({ message: "Access denied. Unauthorized role or mismatched ID." });
    } catch (err) {
        response.status(400).json({ message: 'Invalid token.' });
    }
};