import CasoDeUso from "@/core/shared/CasoDeUso";
import Produto from "../model/Produto";
import Usuario from "@/core/usuario/model/Usuario";

export type Entrada = {
  produtoId: string,
  usuario: Usuario
}

export default class ObterProdutoPorId implements CasoDeUso<Entrada, Produto> {
  async executar(entrada: Entrada): Promise<Produto> {
    return {
      id: entrada.produtoId,
      nome: "produto 1",
      preco: 10,
      consultadoPor: entrada.usuario.email
    };
  }
}
