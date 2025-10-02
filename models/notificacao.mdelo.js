import mongoose from "mongoose";


const notificacao = mongoose.Schema ({
  capsulaId: { type: Schema.Types.ObjectId, ref: "capsulas", required: true },
  tipo: { type: String, required: true },
  dataEnvio: { type: Date, default: Date.now },
  status: { type: String, enum: ["pendente", "enviada", "recebida"], default: "pendente" }
});

const notificacaomodelo = mongoose.model("notificacao", notificacao);


export default notificacaomodelo