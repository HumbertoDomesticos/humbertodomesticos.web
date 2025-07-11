import { ProdutoVM } from "@/viewmodel/produto_vm";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { randomUUID } from "crypto";

export interface ProdutoApi {
  produtos: Produto[];
}

export interface IImage{
  url_img: string;
}

interface ICategoria {
  descritivo_categoria: string
}

export interface Produto {
  id_produto: number;
  descritivo_produto: string;
  descricao_produto: string;
  estoque_produto: number;
  quantidade: number;
  preco: string;
  desconto: number;
  preco_descontado: string;
  imagens: IImage[];
  categorias?: ICategoria[];
}

// function mapProdutoToProdutoVM(produto: Produto): ProdutoVM {
//   return {
//     id: produto.id,
//     nome: produto.nome,
//     precoFormatado: `R$ ${produto.preco.toFixed(2).replace('.', ',')}`,
//     emEstoque: produto.estoque > 0,
//     categoria: produto.categoria,
//   };
// }

export async function getProduto(): Promise<AxiosResponse> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/produtos');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}   

export async function updateProduto(idProduto: number, body: Partial<Produto>): Promise<Produto> {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/produtos/${idProduto}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
 
export async function deleteProduto(idProduto: number): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/produtos/${idProduto}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}   