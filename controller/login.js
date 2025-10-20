import dotenv from 'dotenv'
dotenv.config()
import finalModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// login

const SECRET = process.env.JWT_SECRET
 const login = async (req, res) =>{
  const user = new finalModel(req.body)
  let { email, password } = user  

  if(!email  || !password ){
    return res
              .status(400)
              .json({message: "Preencha os campos devidamente"})
  }
     try {
       const existe = await finalModel.findOne({email})

      if(!existe){
      return res
            .status(404)
            .json({message: "erro no login, usuario nao encontrado"})
      } else{
        // inicia comparacao de senha pelo bcrypt
          const senhaCorreta = await bcrypt.compare(password, existe.password)

          if(!senhaCorreta){
            return res
                      .status(401)
                      .json({message: "Password incorreta!"})
          } 
          // login feito gerar token json.. retificar usar id e role
          const token = jwt.sign({id: existe.id }, SECRET, {expiresIn: '1h'})
          return res
                    .status(200)
                    .json({ 
                      token
                    })
      }
     } catch (error) {
        res
            .status(500)
            .json({errorMessage: "erro no login", errorMessage: error.message})
     }
}

export default login;