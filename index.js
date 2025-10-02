import dotenv from 'dotenv'
dotenv.config();
import app from "./config/app.js";
import {swaggerUi, swaggerSpec} from './config/swagger.js'
import mongoose from "mongoose";
import route from './routes/userRoutes.js'
import enviarCapsula from "./jobs/enviar.capsula.js";


const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

// rota da documentacao
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// rota api
app.use("/api", route)


mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Conexao bem sucedida.");

    // iniciar capsula envio
    enviarCapsula()
    app.listen(PORT, () => {
      console.log(`Servidor operando na porta: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Conexao falhou", err.message);
  });

  

