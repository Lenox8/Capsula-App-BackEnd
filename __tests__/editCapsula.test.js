import request from "supertest";
import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import capsulaModelo from "../models/capsula.modelo.js";
import editCapsula from "../controller/editar.capsula.js";

// === Configuração do app Express ===
const app = express();
app.use(express.json());

// Middleware para simular autenticação JWT
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      req.user = jwt.verify(token, "segredo_teste");
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
  next();
});

// Rota de teste
app.put("/capsulas/:id", editCapsula);

// === Setup do Banco de Dados ===
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/capsula_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await userModel.deleteMany({});
  await capsulaModelo.deleteMany({});
});

describe("PUT /capsulas/:id → Editar cápsula", () => {
  let token, user, capsula;

  beforeEach(async () => {
    // Criar usuário
    const senhaHash = await bcrypt.hash("123456", 10);
    user = await userModel.create({
      nome: "Lenox",
      email: "user@gmail.com",
      password: senhaHash,
    });

    token = jwt.sign({ id: user._id }, "segredo_teste", { expiresIn: "1h" });

    // Criar cápsula com data futura
    const dataFutura = new Date(Date.now() + 86400000); // +1 dia
    capsula = await capsulaModelo.create({
      userId: user._id,
      title: "Minha cápsula",
      content: "Conteúdo antigo",
      dataEnvio: dataFutura,
    });
  });

  it("❌ Deve retornar 401 se não houver autenticação", async () => {
    const res = await request(app)
      .put(`/capsulas/${capsula._id}`)
      .send({ content: "novo conteúdo" });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Access Denied/i);
  });

  it("❌ Deve retornar 404 se a cápsula não existir", async () => {
    const idInexistente = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/capsulas/${idInexistente}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "novo conteúdo" });

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/Capsula nao encontrada/i);
  });

  it("❌ Deve retornar 400 se a data de envio já estiver vencida", async () => {
    const dataPassada = new Date("2020-01-01");
    const capsulaVencida = await capsulaModelo.create({
      userId: user._id,
      title: "Antiga",
      content: "Velho conteúdo",
      dataEnvio: dataPassada,
    });

    const res = await request(app)
      .put(`/capsulas/${capsulaVencida._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "novo conteúdo" });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/data já vencida/i);
  });

  it("✅ Deve atualizar o conteúdo se tudo estiver correto", async () => {
    const res = await request(app)
      .put(`/capsulas/${capsula._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Novo conteúdo da cápsula" });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/capsula atualizada/i);
    expect(res.body.capsula.content).toBe("Novo conteúdo da cápsula");
  });
});
