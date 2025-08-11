import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export class JwtHelper {

    static async generateKey(correo, tipoUsuario) {
        try {
            const token = jwt.sign({ correo, tipoUsuario }, JWT_SECRET, {
                expiresIn: '1h',
            });
            return token;
        } catch (error) {
            console.error('generateKey error: ', error);
        }
    }

}