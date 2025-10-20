import capsulamodelo from '../models/capsula.modelo.js'

export default  async function Pendentes(req, res) {
    
    const userId = req.user?.id

    if(!userId){
        return res.status(401).json({message: 'Access Denied!'})
    }

    try {

        const capsulasPendentes = await capsulamodelo.find({
        userId, 
        status: 'pendente' 
        })

        if(!capsulasPendentes || capsulasPendentes.length === 0){
            return res.status(200).json([])
        }


    return res.status(200).json(capsulasPendentes)
    } catch (error) {
        console.error('Erro no endpoint /capsulas/pendentes', error)
        return res.status(500).json({message: 'Internal server error' ,error})
    }
}
