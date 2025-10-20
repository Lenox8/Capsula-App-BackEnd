import request from "supertest";
import express from "express";
import criarCapsula from "../controller/capsula.create";


const app = express();
app.use(express.json());
app.post("/criarCapsula", criarCapsula);

describe("POST /criarCapsula", () =>{
    it("Deve retornar erro se faltar campos obrigatorios, ou mal preenchidos",  async () =>{
        const response = await request(app)
            .post("/criarCapsula")
            .send({  content: "", dataEnvio: "", emailDestinatario: "" })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
})