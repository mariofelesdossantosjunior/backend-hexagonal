import jwt from "jsonwebtoken";

export default class ProvedorJWT {
  constructor(private segredo: string) {}

  gerar(dados: string | object): string {
    return jwt.sign(dados, this.segredo, {
      expiresIn: "1d",
    });
  }
}
