import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

// jwt secret
const SECRET = process.env.JWT_SECRET

export const verificarToken = (req, res, next) =>{

    const authHeader = req.headers['authorization'] 

    if (!authHeader) {
        return res
                .status(401)
                .json({message: "Token nao fornecido"})
    }

    const token = authHeader.split(" ")[1] 

    if (!token) {
    return res
            .status(401)
            .json({message: "Token invalido ou mal formatado, garanta que nao haja espacos"})
    }

    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded 
        next() 
    } catch (error) {
    return res
            .status(500).json({errorMessage: "token expirado", errorMessage: error.message})
    }
}

