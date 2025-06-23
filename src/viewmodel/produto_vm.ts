import { UUID } from "crypto";

export interface ProdutoVM {
  key_produto: UUID;
  id_produto: number;
  estoque_produto: number;
  quantidade: number;
}
