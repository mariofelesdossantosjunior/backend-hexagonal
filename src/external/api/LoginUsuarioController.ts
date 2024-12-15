import LoginUsuario from "@/usuario/service/LoginUsuario";
import { Express } from "express";

export default class LoginUsuarioController {
  constructor(servidor: Express, casoDeUso: LoginUsuario) {
    servidor.post("/api/usuarios/login", async (req, res) => {
      try {
        const resposta = await casoDeUso.executar({
          email: req.body.email,
          senha: req.body.senha,
        });

        res.status(200).send(resposta);
      } catch (error: any) {
        res.status(401).send(error.message);
      }
    });
  }
}
