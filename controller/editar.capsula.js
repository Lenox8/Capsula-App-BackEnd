import capsulamodelo from "../models/capsula.modelo.js";


const editCapsula = async(req, res) => {

    const userId = req.user.id
    let { id: capsulaId } = req.params

    if(!userId){
        return res.status(401).json({message: "Access Denied!"})
    }

    try {
        let { content } = req.body

        const findCapsula = await capsulamodelo.findOne({ _id: capsulaId, userId})

        if(!findCapsula){
            return res.status(404).json({message: "Capsula nao encontrada"})
        }
        const dataHoje = new Date()

        if(findCapsula.dataEnvio <= dataHoje){
            return res.status(400).json({message: "Não é possível editar uma cápsula com data já vencida"})
        }
        findCapsula.content = content
        await findCapsula.save()
        return res.status(200).json({message: "capsula atualizada", capsula: findCapsula})

    } catch (error) {
        return res.status(500).json({message: "Server internal error", error})
    }

}

export default editCapsula