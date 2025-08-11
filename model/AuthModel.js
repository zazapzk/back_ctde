import { pool } from './db.js';

export class AuthModel {

    static async isRegisterIndentify(identificacion) {
        try {
            const rows = await pool.query(
                'SELECT COUNT(*) AS count FROM usuario WHERE identificacion = ?',
                [identificacion]
            );
            const exist = rows[0];
            if (exist.count > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('isRegisterIndentify error:', error);
        }
    }
    static async isRegisterEmail(correo) {
        try {
            const rows = await pool.query(
                'SELECT COUNT(*) AS count FROM usuario WHERE correo = ?',
                [correo]
            );
            const exist = rows[0];
            if (exist.count > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('isRegisterEmail error:', error);
        }
    }
    static async register(nombre, identificacion, direccion, correo, telefono, contraseña, tipoUsuario) {
        try {
            const insertUsuario = `
            INSERT INTO usuario (nombre, identificacion, direccion, correo, telefono, contraseña, tipousuario_idtipousuario) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            const result = await pool.query(insertUsuario, [nombre, identificacion, direccion, correo, telefono, contraseña, tipoUsuario]);
            return true;
        } catch (error) {
            console.error('registerModel error: ', error);
        }
    }
    static async getPass(correo) {
        try {
            const [pass] = await pool.query(
                'SELECT contraseña FROM usuario WHERE correo = ?',
                [correo]
            );
            return pass;
        } catch (error) {
            console.error('getPass error: ', error);
        }
    }
    static async getId(correo) {
        try {
            const [id] = await pool.query(
                'SELECT idusuario FROM usuario WHERE correo = ?',
                [correo]
            );
            return id;
        } catch (error) {
            console.error('getId error: ', error);
        }
    }

}