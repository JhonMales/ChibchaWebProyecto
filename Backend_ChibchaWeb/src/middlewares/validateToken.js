import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    
    if(!token){
        console.log("No token, autorización denegada");
        return res.status(401).json({message: "No token, autorización denegada"});
    } 

    jwt.verify(token, TOKEN_SECRET, (err, usuario) => {
        if(err) return res.status(403).json({message: "Token Invalido"});

        //console.log(usuario);
        req.usuario = usuario;

        next();
    });
}