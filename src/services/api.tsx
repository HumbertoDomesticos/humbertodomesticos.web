import { TesteAPI } from "./routes/isConnected/page";

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    desconto: number;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
  }
  
  interface HomeProps {
    produtos: Produto[];
  }
  
//   export async function getServerSideProps() {
//     const res = await TesteAPI;
  
//     // return { produtos }

//     // const produtos = await TesteAPI();


//     return {
//         props: {
//             res
//         }
//     };
//   }
  
  export function ApiTeste({ produtos }: HomeProps) {

    // const produtos = await TesteAPI();




    return (
      <div>
        <h1>Lista de Produtos</h1>
        {JSON.stringify(produtos.map((e) => e))}
    
        {produtos.map((produto) => (
          <div key={produto.id}>
            <h2>{produto.nome}</h2>
            <p>Preço: R$ {produto.preco}</p>
            <p>Desconto: R$ {produto.desconto}</p>
            {produto.img1 && <img src={produto.img1} alt={produto.nome} width="200" />}
            <hr />
          </div>
        ))}
      </div>
    );
  }