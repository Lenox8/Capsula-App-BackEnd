import capsulamodelo from "../models/capsula.modelo.js";



const verify = async (req, res) =>{

    let { status } = new capsulamodelo(req.body)
}

export default verify