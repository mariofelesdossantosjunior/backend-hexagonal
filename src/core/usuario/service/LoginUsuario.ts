import CasoDeUso from "@/core/shared/CasoDeUso";
import Usuario from "../model/Usuario";
import Repositoriousuario from "./RepositorioUsuario";
import Erros from "@/core/shared/Erros";
import ProvedorCriptografia from "./ProvedorCriptografia";

export type Entrada = { email: string; senha: string };

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
  constructor(
    private repositorio: Repositoriousuario,
    private provedorCripto: ProvedorCriptografia
  ) {}

  async executar(entrada: Entrada): Promise<Usuario> {
    const usuarioExistente = await this.repositorio.buscarPorEmail(
      entrada.email
    );

    if (!usuarioExistente) {
      throw new Error(Erros.USUARIO_NAO_ENCONTRADO);
    }

    const mesmaSenha = this.provedorCripto.comparar(
      entrada.senha,
      usuarioExistente.senha!
    );

    if (!mesmaSenha) {
      throw new Error(Erros.SENHA_INCORRETA);
    }

    return { ...usuarioExistente, senha: undefined };
  }
}
