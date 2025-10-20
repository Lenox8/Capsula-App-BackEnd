import express from "express";
import login from "../controller/login.js";
import signUp from "../controller/signUp.js";
import criarCapsula from "../controller/capsula.create.js";
import { verificarToken } from "../middleware/auth.js";
import cancelarCapsula from "../controller/cancelar.capsula.js";
import editCapsula from "../controller/editar.capsula.js";
import getAllCapsulas from "../controller/getAllCapsulas.js";
import apagarCapsula from "../controller/apagar.capsula.js";
import getUser from "../controller/getUserById.js"
import capsulapendente from '../controller/capsulasPendentes.js'

const route = express.Router();

// rota login e signin
route.post("/login", login); //login usuarios
route.post("/cadastrar", signUp); //cadastrar usuarios

// rotas de capsula
route.post("/criarCapsula", verificarToken, criarCapsula);
route.patch("/cancelarCapsula/:id", verificarToken, cancelarCapsula);
route.put("/editarCapsula/:id", verificarToken, editCapsula);
route.get("/capsulas", verificarToken, getAllCapsulas);
route.delete("/apagarCapsula/:id", verificarToken, apagarCapsula);
route.get("/me", verificarToken, getUser)
route.get("/capsulas/pendentes", verificarToken, capsulapendente)
// api documentation
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Routes de gerenciamento de usuários
 */
/** 
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Faz login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login bem-sucedido (retorna token JWT)
 *       401:
 *         description: Credenciais inválidas
 */
route.post("/login", login);

/**
 * @swagger
 * /api/cadastrar:
 *   post:
 *     summary: Cadastra novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               role:
 *                  type: string
 *                  example: "employee"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
route.post("/cadastrar", signUp);

/**
 * @swagger
 * /api/todosUsers:
 *   get:
 *     summary: Lista todos os usuários (apenas admins)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       403:
 *         description: Acesso negado
 */

export default route;
