import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useProduto } from "@/app/context/ProdutosContext";

interface ProdutoParaComprarProps {
    isBuying: boolean;
}

export default function ProdutoParaComprar({ isBuying }: ProdutoParaComprarProps) {
    const [value, setValue] = useState(1);

    const handleDecrement = () => {
        setValue((prev) => Math.max(1, prev - 1));
    };

    const handleIncrement = () => {
        setValue((prev) => Math.min(99, prev + 1));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseInt(e.target.value, 10);

        // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
        if (isNaN(newValue)) {
            setValue(1);
            return;
        }

        if (newValue < 1) {
            setValue(1);
        } else if (newValue > 99) {
            setValue(99);
        } else {
            setValue(newValue);
        }
    };

    const { carrinho, removerDoCarrinho, limparCarrinho, quantidadeItens } = useProduto();

    return (
        <div className={styles.produto}>
            {carrinho.map((produto) => (
                <div className={styles.pai} key={produto.id_prod}>
                    <div className={styles.produtoAll} key={produto.id_prod}>

                        <div>
                            <Image src={"/products/lavaeseca.png"} alt={""} width={90} height={80} />
                        </div>

                        <div className={styles.produtoInfo}>
                            <p>{produto.nome_prod}</p>

                            {isBuying ? (
                                <div>
                                    <p>Quantidade: 1</p>
                                </div>
                            ) : (
                                <div className={styles.quantity_container}>
                                    <button type="button" onClick={handleDecrement}>-</button>
                                    <input
                                        type="number"
                                        value={value}
                                        onChange={handleChange}
                                        min={1}
                                        max={99}
                                    />
                                    <button type="button" onClick={handleIncrement}>+</button>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className={styles.prices} key={produto.id_prod}>
                        <div>
                            <p>De {produto.preco_produto}</p>
                            <span>Por {produto.desconto_preco_produto}</span>
                        </div>
                        <span className={styles.excluir}>Excluir</span>
                    </div>
                </div>
            ))}
        </div>
    )
}