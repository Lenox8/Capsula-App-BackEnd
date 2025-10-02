import finalModel from "../models/userModel.js";

const getUser = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Access Denied! Login first" });
  }

  try {
    const user = await finalModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json({
      nome: user.nome,
      email: user.email
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar usuário", error: error.message });
  }
};

export default getUser;
