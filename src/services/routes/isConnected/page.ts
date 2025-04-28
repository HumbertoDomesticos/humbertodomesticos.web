import type { Produto } from "@/services/api";
import type { AxiosResponse } from "axios";
import axios from "axios";

export async function TesteAPI(): Promise<Produto[]> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/is-connected');
      // biome-ignore lint/complexity/noForEach: <explanation>
    //   response.data.forEach((p) => {
    //     console.log(p); 
    //   });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }