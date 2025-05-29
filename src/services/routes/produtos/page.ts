import type { AxiosResponse } from "axios";
import axios from "axios";

export interface ProdutoApi {
  produtos: Produto[];
}

export interface IImage{
  path_image: string;
  id_prod_images: number;
  id_image: number;
}

export interface Produto {
  nome_prod: string;
  descricao_prod: string;
  desconto_prod: number;
  estoque_prod: number;
  id_prod: number;
  quantidade: number;
  preco_produto: string;
  desconto_preco_produto: string;
  images_prod: IImage[];
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