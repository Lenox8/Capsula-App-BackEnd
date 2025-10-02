import cron from "node-cron";
import capsulamodelo from "../models/capsula.modelo.js";
import sendEmail from "../config/sendemail.js";
import moment from "moment-timezone";
const enviarCapsula = async (req, res) => {
  cron.schedule("* * * * *", async () => {
    console.log("Verificando capsulas para envio");

    const agoraUTC = moment.tz("Africa/Maputo").toDate();

    try {
      const capsulas = await capsulamodelo.find({
        dataEnvio: { $lte: agoraUTC },
        status: "pendente",
      });

      for (const cap of capsulas) {
        if (!cap.emailDestinatario) {
          console.warn(
            `Cápsula ${cap._id} não tem emailDestinatario definido, pulando...`
          );
          continue;
        }

        await sendEmail(
          cap.emailDestinatario,
          "🎉 A sua cápsula do tempo foi entregue!",
          `
Olá ${cap.emailDestinatario || "amigo(a)"},

O grande momento chegou! ⏳✨  
A cápsula do tempo que foi preparada especialmente para você finalmente se abriu.

📦 Aqui está o conteúdo guardado:
---------------------------------
${cap.content}
---------------------------------

Esperamos que esta mensagem traga boas memórias e emoções.  
Obrigado por fazer parte desta jornada com a TimeNest 💙

Com carinho,  
Equipe TimeNest
`
        );

        cap.status = "enviada";
        await cap.save();
        console.log(`Capsula enviada para ${cap.emailDestinatario}`);
      }
    } catch (error) {
      console.error("Erro ao processar capsulas", error);
    }
  });
};

export default enviarCapsula;
