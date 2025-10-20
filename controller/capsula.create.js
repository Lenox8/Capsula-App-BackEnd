import dotenv from "dotenv";
dotenv.config();
import capsulamodelo from "../models/capsula.modelo.js";
import moment from "moment-timezone";

const criarCapsula = async (req, res) => {
  try {
    const { content, dataEnvio, emailDestinatario } = req.body;

    if (!content || !dataEnvio || !emailDestinatario) {
      return res.status(400).json({
        message:
          "Campos obrigatórios faltando: content, dataEnvio ou emailDestinatario",
      });
    }

    // Se não estiver autenticado, evita quebrar aqui
    const userId = req.user?.id 

    const datalocal = moment(dataEnvio, "YYYY-MM-DD HH:mm").tz("Africa/Maputo");

    if (!datalocal.isValid()) {
      return res.status(400).json({ message: "Data de envio inválida" });
    }

    const agoraUTC = datalocal.utc().toDate();
    const datahoje = new Date();

    if (agoraUTC < datahoje) {
      return res.status(400).json({
        message: "Não foi possível criar cápsula: data inválida (anterior a hoje)",
      });
    }

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
      message: "Cápsula criada com sucesso",
      novaCapsula,
    });
  } catch (error) {
    console.error("Erro ao criar cápsula:", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
};

export default criarCapsula;
