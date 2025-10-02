import capsulamodelo from "../models/capsula.modelo.js";

const getAllCapsulas = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Access Denied!" });
  }

  try {
    // Certifique-se que o campo no modelo é 'userId'.
    const capsulas = await capsulamodelo.find({ userId });
    if (!capsulas || capsulas.length === 0) {
      return res.status(404).json({ message: "Nenhuma capsula encontrada" });
    }
    return res.status(200).json(capsulas);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar capsulas", error: error.message });
  }
};

export default getAllCapsulas;
