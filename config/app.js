import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
app.use(express.json()) 
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://capsula-app-front-ned.vercel.app',
  credentials: true
}))


export default app