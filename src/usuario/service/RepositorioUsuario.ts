import Usuario from "../model/Usuario"

export default interface Repositoriousuario {
    inserir(usuario: Usuario): Promise<void>
    buscarPorEmail(email: string): Promise<Usuario | null>
}
