import Image from "next/image";
import styles from "./styles.module.scss";
import { useProduto } from "@/app/context/ProdutosContext";

interface ProdutoParaComprarProps {
    isBuying: boolean;
}

export default function ProdutoParaComprar({ isBuying }: ProdutoParaComprarProps) {
    const {
        carrinho,
        atualizarQuantidade,
        removerDoCarrinho,
    } = useProduto();

    const handleIncrement = (produtoId: number, estoque: number, quantidadeAtual: number) => {
        if (quantidadeAtual < estoque) {
            atualizarQuantidade(produtoId, quantidadeAtual + 1);
        }
    };

    const handleDecrement = (produtoId: number, quantidadeAtual: number) => {
        if (quantidadeAtual > 1) {
            atualizarQuantidade(produtoId, quantidadeAtual - 1);
        }
    };

    return (
        <div className={styles.produto}>
            {carrinho.map((produto) => (
                <div className={styles.pai} key={produto.id_prod}>
                    <div className={styles.produtoAll}>
                        <div>
                            <Image src={"/products/lavaeseca.png"} alt={produto.nome_prod} width={90} height={80} />
                        </div>

                        <div className={styles.produtoInfo}>
                            <p>{produto.nome_prod}</p>

                            {isBuying ? (
                                <div>
                                    <p>Quantidade: {produto.quantidade}</p>
                                </div>
                            ) : (
                                <div className={styles.quantity_container}>
                                    <button type="button" onClick={() => handleDecrement(produto.id_prod, produto.quantidade)}>-</button>

                                    <input
                                        type="number"
                                        value={produto.quantidade}
                                        onChange={(e) => {
                                            const novaQuantidade = Number(e.target.value);
                                            if (novaQuantidade >= 1 && novaQuantidade <= produto.estoque_prod) {
                                                atualizarQuantidade(produto.id_prod, novaQuantidade);
                                            }
                                        }}
                                        min={1}
                                        max={produto.estoque_prod}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleIncrement(produto.id_prod, produto.estoque_prod, produto.quantidade)}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.prices}>
                        <div>
                            <p>De {produto.preco_produto}</p>
                            <span>Por {produto.desconto_preco_produto}</span>
                        </div>
                        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                        <span className={styles.excluir} onClick={() => removerDoCarrinho(produto.id_prod)}>
                            Excluir
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
