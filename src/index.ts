import dotenv from "dotenv";
dotenv.config();

import express from "express";
import RepositoriousuarioPg from "./external/db/RepositorioUsuarioPg";
import SenhaCripto from "./external/auth/SenhaCripto";
import RegistrarUsuario from "./usuario/service/RegistrarUsuario";
import RegistrarUsuarioController from "./external/api/RegistrarUsuarioController";
import LoginUsuario from "./usuario/service/LoginUsuario";
import LoginUsuarioController from "./external/api/LoginUsuarioController";

const app = express();
const port = process.env.API_PORT ?? 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`🔥 API rodando na porta ${port}`);
});

const repositorioUsuario = new RepositoriousuarioPg();
const provedorCripto = new SenhaCripto();
const registrarUsuario = new RegistrarUsuario(
  repositorioUsuario,
  provedorCripto
);

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);

new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);
