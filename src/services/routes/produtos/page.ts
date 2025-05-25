import type { AxiosResponse } from "axios";
import axios from "axios";

export interface ProdutoApi {
  produtos: Produto[];
}

export interface Produto {
  quantidade: number;
  id_prod: number;
  nome_prod: string;
  descricao_prod: string;
  preco_produto: string;
  desconto_prod: number;
  desconto_preco_produto: string;
  estoque_prod: number;
  img1: string;
  img2: string;
  img3: string;
}

export async function getProduto(): Promise<AxiosResponse> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/produtos');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}   