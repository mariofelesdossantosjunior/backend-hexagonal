import LoginUsuario from "@/core/usuario/service/LoginUsuario";
import { Express } from "express";
import ProvedorJWT from "./ProvedorJWT";
import UsuarioMiddleware from "./UsuarioMiddleware";

export default class LoginUsuarioController {
  constructor(servidor: Express, casoDeUso: LoginUsuario) {
    servidor.post("/api/usuarios/login", async (req, res) => {
      try {
        const usuario = await casoDeUso.executar({
          email: req.body.email,
          senha: req.body.senha,
        });

        const provedorJWT = new ProvedorJWT(process.env.JWT_SECRET!);

        res.status(200).send({
          usuario,
          token: provedorJWT.gerar(usuario),
        });
      } catch (error: any) {
        res.status(401).send(error.message);
      }
    });
  }
}
