export default interface provedorCriptografica {
    criptografar(senha: string): string
    comparar(senha: string, senhaCriptografada: string): boolean
}
