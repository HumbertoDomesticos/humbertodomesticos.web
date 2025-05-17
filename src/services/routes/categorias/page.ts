import type { AxiosResponse } from "axios";
import axios from "axios";

export interface Categoria {
    id_categoria: number;
    descritivo_categoria: string;
}

export async function getCategoria(): Promise<AxiosResponse> {
    try {
        const response = await axios.get('http://127.0.0.1:8000/categorias');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   