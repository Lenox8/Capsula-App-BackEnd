import dotenv from "dotenv";
dotenv.config();
import capsulamodelo from "../models/capsula.modelo.js";
import moment from "moment-timezone";


const criarCapsula = async (req, res) => {
  const { content, dataEnvio, emailDestinatario } = req.body;
  const userId = req.user.id;
  const datalocal = moment(req.body.dataEnvio, "YYYY-MM-DD HH:mm").tz("Africa/Maputo")
  const agoraUTC =datalocal.utc().toDate();

  if (!userId) {
    return res.status(401).json({ message: "Usuario nao autenticado" });
  }

  if (!content || !dataEnvio || !emailDestinatario) {
    return res.status(400).json({
      message:
        "Campos obrigatórios faltando: content, dataEnvio ou emailDestinatario",
    });
  }
  const datahoje = new Date()
  if(dataEnvio < datahoje){
    return res.status(400).json({message: "Nao foi possivel criar capsula, data invalida"})
  }
  try {
    // Criar a cápsula
    const novaCapsula = new capsulamodelo({
      userId,
      content,
      dataEnvio: agoraUTC,
      emailDestinatario,
      status: "pendente",
    });

    await novaCapsula.save();

    return res.status(201).json({
      message: "Capsula criada com sucesso",
      novaCapsula,
    });
  } catch (error) {
    console.error("Erro ao criar cápsula ou enviar email:", error);
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
};

export default criarCapsula;
