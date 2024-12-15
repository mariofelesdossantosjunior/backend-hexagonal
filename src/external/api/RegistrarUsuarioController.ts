import RegistrarUsuario from "@/usuario/service/RegistrarUsuario";
import { Express } from "express";

export default class RegistrarUsuarioController {
  constructor(servidor: Express, casoDeUso: RegistrarUsuario) {
    servidor.post("/api/usuarios/registrar", async (req, res) => {
      try {
        await casoDeUso.executar({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });

        res.status(201).send();
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    });
  }
}
