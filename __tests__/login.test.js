import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
import userModel from "../models/userModel.js";
import login from "../controller/login.js";

const app = express()
app.use(express.json())
app.post("/login", login)

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/capsula_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await userModel.deleteMany({});
});

describe("POST /login", () => {
  it("Deve retornar 400 se faltar email ou password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "", password: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Deve retornar 404 se o usuário não for encontrado", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "naoexiste@gmail.com", password: "123456" });

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/usuario nao encontrado/i);
  });

  it("Deve retornar 401 se a senha estiver incorreta", async () => {
    const senhaHash = await bcrypt.hash("senhaCorreta", 10);

    await userModel.create({
      email: "user@gmail.com",
      password: senhaHash,
      nome: "Lenox",
    });

    const response = await request(app)
      .post("/login")
      .send({ email: "user@gmail.com", password: "senhaErrada" });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/password incorreta/i);
  });


});
