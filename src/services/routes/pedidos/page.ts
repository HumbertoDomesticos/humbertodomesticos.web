import type { AxiosResponse } from "axios";
import axios from "axios";
import { Produto } from "../produtos/page";

export interface IPedidoDetalhes {
    quant_produto_em_pedido: number;
    produto: Produto;
}

export interface IPedidos {
    id_pedido: number;
    data_criacao_pedido: string;
    data_ultima_alteracao_pedido: string;
    data_finalizacao_pedido: string | null;
    tipo_pagamento: "nenhum" | "pix" | "transf_banc"; // Adjusted based on likely values
    status_pedido: "em_carrinho" | "finalizado" | "cancelado" | "processando"; // Adjusted based on likely values
    produtos_em_pedido: IPedidoDetalhes[];
}

const API_BASE_URL = "http://127.0.0.1:8000/pedidos";

export async function getPedidoAberto(
    idUsuario: number
): Promise<AxiosResponse<IPedidos>> {
    try {
        const response = await axios.get<IPedidos>(
            `${API_BASE_URL}/${idUsuario}/pedido-aberto`,
        );
        return response;
    } catch (error) {
        console.error('Error getting/cart order:', error);
        throw new Error('Failed to get/create cart order');
    }
}

export async function postProdutoEmPedido(
    idUsuario: number,
    idProduto: number,
    quantidade: number
): Promise<AxiosResponse<IPedidos>> {
    try {
        return await axios.post<IPedidos>(
            `${API_BASE_URL}/${idUsuario}/add-produto/${idProduto}/${quantidade}`,
            null,
            {
                headers: { 
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error adding product to order:', error);
        throw new Error('Failed to add product to order');
    }
}

export async function postFecharPedido(
    idUsuario: number,
    tipoPagamento: "pix" | "cartao" | "boleto"
): Promise<AxiosResponse<IPedidos>> {
    try {
        return await axios.post<IPedidos>(
            `${API_BASE_URL}/${idUsuario}/fechar-pedido`,
            { tipo_pagamento: tipoPagamento },
            {
                headers: { 
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error closing order:', error);
        throw new Error('Failed to close order');
    }
}

export async function postPedido(
    idUsuario: number
): Promise<AxiosResponse<IPedidos>> {
    try {
        return await axios.post<IPedidos>(
            `${API_BASE_URL}/${idUsuario}`,
            null,
            {
                headers: { 
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
}