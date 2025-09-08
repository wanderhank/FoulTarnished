import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {role} from "../models/Admin"


const JWT_SECRET =process.env.JWT_SECRET || "default_secret";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, hashedPassowrd: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassowrd);
}

export const generateToken = (userId: number, username: string, role: role): string => {
    return jwt.sign({id: userId, username, role}, JWT_SECRET, {expiresIn: '1h'});
}
export const verifyToken = (token: string): any =>  {
    return jwt.verify(token, JWT_SECRET);
}

