import Usuario from "../model/Usuario"
import Id from "@/core/shared/Id"
import ProvedorCriptografica from "./ProvedorCriptografia"
import Repositoriousuario from "./RepositorioUsuario"
import CasoDeUso from "@/core/shared/CasoDeUso"
import Erros from "@/core/shared/Erros"

export default class RegistrarUsuario
    implements CasoDeUso<Usuario, void>
{
    constructor(
        private repositorio: Repositoriousuario,
        private provedorCripto: ProvedorCriptografica
    ) {}

    async executar(usuario: Usuario): Promise<void> {
        const senhaCripto = this.provedorCripto.criptografar(usuario.senha!)

        const usuarioExistente =
            await this.repositorio.buscarPorEmail(
                usuario.email
            )

        if (usuarioExistente)
            throw Error(Erros.USUARIO_JA_EXISTE)

        const novoUsuario: Usuario = {
            id: Id.gerarHash(),
            nome: usuario.nome,
            email: usuario.email,
            senha: senhaCripto,
        }

        this.repositorio.inserir(novoUsuario)

        console.log(
            `\n\n ${JSON.stringify(novoUsuario)}\n\n`
        )
    }
}
