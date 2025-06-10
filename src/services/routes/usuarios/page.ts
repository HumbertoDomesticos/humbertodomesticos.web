import type { AxiosResponse } from "axios";
import axios from "axios";


export type Usuario = {
  id_usuario?: number;
  nome_usuario: string;
  cpf: string;
  genero_usuario: string,
  email_usuario: string;
  senha_usuario_temp: string;
  enderecos?: IUserAddress[];
  // data_nasc_usuario: string;
}

export interface IUserAddress {
  cep_endereco: string,
  numero_endereco: string,
  rua_endereco: string,
  bairro_endereco: string,
  cidade_endereco: string,
  descricao_endereco: string,
  uf_endereco: string,
}

export async function getUsuario(): Promise<AxiosResponse> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/usuarios');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postUsuario(usuario: Usuario): Promise<AxiosResponse> {
  try {
    const response = await axios.post('http://127.0.0.1:8000/usuarios', usuario);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUsuarioPorEmail(email: string): Promise<Usuario[]> {
  const response = await axios.get(`http://127.0.0.1:8000/usuarios?email=${email}`);
  return response.data;
}

export async function postUsuarioEndereco(
  idUsuario: number,
  endereco: IUserAddress
): Promise<AxiosResponse<IUserAddress>> {
  try {
    const response = await axios.post<IUserAddress>(
      `http://127.0.0.1:8000/usuarios/${idUsuario}/add-endereco`,
      endereco,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Failed to add address:', error);
    throw new Error('Failed to add address');
  }
}