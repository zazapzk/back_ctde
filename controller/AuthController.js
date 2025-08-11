import { AuthModel } from "../model/AuthModel.js";
import { JwtHelper } from "../utils/JwtHelper.js";
import bcrypt from 'bcrypt';

export class AuthController{

    static async register(req, res){
        try {

            const { nombre, identificacion, direccion, correo, telefono, contraseña, tipoUsuario } = req.body;
            const hash = await bcrypt.hash(contraseña, 12);

            if (await AuthModel.isRegisterIndentify(identificacion) === true){
                return res.status(200).json({ msg :  'Usuario ya registrado con esa identificación.' })
            }
            if (await AuthModel.isRegisterEmail(correo) === true){
                return res.status(200).json({ msg :  'Usuario ya registrado con ese correo.' })
            }
            if (await AuthModel.register(nombre, identificacion, direccion, correo, telefono, hash, tipoUsuario) == true ){
                return res.status(200).json({ msg: 'Usuario registrado correctamente.' });
            }
            
        } catch (error) {
            console.error('Error registerController: ', error);
        }
    }

    static async login(req, res){
        try {
            const { correo, contraseña } = req.body;

            if (await AuthModel.isRegisterEmail(correo) === true){

                const pass = await AuthModel.getPass(correo);
                const match = await bcrypt.compare(contraseña, pass.contraseña);

                if(match){

                    const id = await AuthModel.getId(correo);
                    const token = await JwtHelper.generateKey(correo, id.idusuario);
                    return res.status(200).json({ token });
                    
                }else {
                    return res.status(200).json({ error: "Credenciales incorrectas" });
                }

            }else{
                return res.status(200).json({ error: "Credenciales incorrectas" });
            }

        } catch (error) {
            console.error('Error loginController:', error);
        }
    }


}