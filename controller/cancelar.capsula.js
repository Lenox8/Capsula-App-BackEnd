import capsulamodelo from "../models/capsula.modelo.js";

const cancelarCapsula = async (req, res) => {
  const userId = req.user.id;
  let { id: capsulaId } = req.params

  if (!userId) {
      return res.status(401).json({ message: "Usuario nao autenticado" });
    }

  try {
    const capsulaFind = await capsulamodelo.findOne({ _id: capsulaId, userId });

    if(!capsulaFind){
        return res.status(404).json({message: "capsula nao encontrada"})
    }

    const dataAgora = new Date()

    // verificar se a data nao venceu

    if(capsulaFind.dataEnvio <= dataAgora){
        return res.status(400).json({message: "Não é possível cancelar uma cápsula já vencida"})
    }

    capsulaFind.status = "cancelada" //usar depois para evitar que capsula seja enviada caso status seja igual a cancelada 

    await capsulaFind.save()

    return res.status(200).json({ message: "Cápsula cancelada com sucesso", capsulaFind });

  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
};

export default cancelarCapsula;
