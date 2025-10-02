import dotenv from "dotenv";
dotenv.config();
import finalModel from "../models/userModel.js";
import zxcvbn from "zxcvbn";


const signUp = async (req, res) => {

  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ message: "Preencha os campos devidamente" });
  } else if (!/^[a-zA-Z\s]+$/.test(nome)) {
    //verifica caracter especial no nome
    return res
      .status(400)
      .json({ message: "Nome invalido, Use apenas letras e espacos" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //special chars em email
    return res
      .status(400)
      .json({
        message: "Email invalido, Use apenas letras, numeros e simbolo arroba",
      });
  } else if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "A senha deve conter 8 digitos no minimo" });
  } else {
    // evitar senhas fracas com middleware zxcvbn
    const resultadoSenha = zxcvbn(password)
    if(resultadoSenha.score < 3){
      return res.status(400).json({message:"Password fraca, escolha uma senha mais forte "
        , sugestoes: resultadoSenha.feedback.suggestions
      })
      
    }
    try {
      const userExists = await finalModel.findOne({ email });
      if (userExists) {
        // se user existir
        res
          .status(400)
          .json({
            message:
              "Email ja em uso",
          });
      } else {
        
        const novoUser = new finalModel({
          nome,
          email,
          password,
        });

        await novoUser.save();
        res.status(200).json({ message: "Usuario cadastrado com sucesso" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          errorMessage: "Falha no login, verifique as  credenciais",
          error,
        });
    }
  }
};

export default signUp;
