import mongoose, { Schema } from "mongoose";


const capsula = mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId, ref: "usuarios", required: true
    },
    content: { type: String, required: true},
    dataEnvio: { type: Date, required: true},
    status: { type: String, enum: [
        "pendente",
        "enviada",
        "cancelada"
    ],
    default: "pendente"
    },
    emailDestinatario: {type: String, required: true}
})

const capsulamodelo = mongoose.model("capsulas", capsula)

export default capsulamodelo    