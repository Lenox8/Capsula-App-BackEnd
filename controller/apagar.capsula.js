import capsulamodelo from "../models/capsula.modelo.js";

const apagarCapsula = async (req, res) =>{

    const userId = req.user.id
    let { id: capsulaId } = req.params

    if(!userId){
        return res.status(401).json({messae: "Access Denied!, Login first"})
    }

    try {
        const deletar = await capsulamodelo.findOne({ _id: capsulaId, userId })

        if(!deletar){
            return res.status(404).json({message: "Capsula nao existe, ou ja foi apagada"})
        }
       

       
        await capsulamodelo.findByIdAndDelete(capsulaId)

        return res.status(200).json({message: "Capsula apagada com sucesso"})
    } catch (error) {
        return res.status(500).json({message: "Internal error server", error})
    }

}

export default apagarCapsula