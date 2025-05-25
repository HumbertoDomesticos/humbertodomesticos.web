import type { AxiosResponse } from "axios";
import axios from "axios";


export type Usuario = {
  id_usuario?: number;
  nome_usuario: string;
  cpf_usuario: string;
  email_usuario: string;
  senha_usuario?: string;
  senha_usuario_temp: string;
  data_nasc_usuario: string;
}


export async function getUsuario(): Promise<AxiosResponse> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/usuarios');
    return response.data;
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
