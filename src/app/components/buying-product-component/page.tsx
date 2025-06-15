import Image from "next/image";
import styles from "./styles.module.scss";
import { useProduto } from "@/app/context/ProdutosContext";
import { Produto } from "@/services/routes/produtos/page";
import { getPedidoAberto } from "@/services/routes/pedidos/page";
import { useAuth } from "@/app/context/AuthContext";
import { IPedidos } from "@/services/routes/pedidos/page";
import react from "react";

interface ProdutoParaComprarProps {
    isBuying: boolean;
}

export default function ProdutoParaComprar({ isBuying }: ProdutoParaComprarProps) {
    const {
        carrinho,
        atualizarQuantidade,
        removerDoCarrinho,
    } = useProduto();
    const { user } = useAuth();

    const [produtosCarrinho, setProdutosCarrinho] = react.useState<Produto[]>([]);
    const [loading, setLoading] = react.useState(true);
    const [error, setError] = react.useState<string | null>(null);
    const [quantidades, setQuantidades] = react.useState<{ [id: number]: number }>({});

    react.useEffect(() => {
        if (!user?.id_usuario) {
            setLoading(false);
            return;
        }

        const fetchPedidoAberto = async () => {
            try {
                setLoading(true);
                const response = await getPedidoAberto(user?.id_usuario!);
                // Extract products from the order response
                const produtos = response.data.produtos_em_pedido.map(item => ({
                    ...item.produto,
                    quantidade: item.quant_produto_em_pedido
                }));
                console.log(produtos)
                setProdutosCarrinho(produtos);
            } catch (err) {
                console.error("Failed to fetch cart:", err);
                setError("Failed to load cart items");
            } finally {
                setLoading(false);
            }
        };

        fetchPedidoAberto();
    }, [user?.id_usuario, carrinho]); // Add carrinho as dependency

    const handleInputChange = (id: number, valor: number) => {
        setQuantidades((prev) => ({ ...prev, [id]: valor }));
    };

    const handleIncrement = (produtoId: number, estoque: number, quantidadeAtual: number) => {
        if (quantidadeAtual < estoque) {
            atualizarQuantidade(produtoId, quantidadeAtual + 1);
        }
    };

    const handleDecrement = (produtoId: number, quantidadeAtual: number) => {
        if (quantidadeAtual > 1) { // Changed from 0 to 1 to keep at least one item
            atualizarQuantidade(produtoId, quantidadeAtual - 1);
        } else {
            removerDoCarrinho(produtoId);
        }
    };

    if (loading) return <div className={styles.loading}>Loading cart...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (produtosCarrinho.length === 0) return <div className={styles.empty}>Your cart is empty</div>;

    return (
        <div className={styles.produto}>
            {/* {JSON.stringify(produtosCarrinho.map((e) => e))} */}
            {produtosCarrinho.map((produto) => (
                <div className={styles.pai} key={produto.id_produto}>
                    <div className={styles.produtoAll}>
                        <div>
                            <Image
                                src={produto.imagens[0]?.url_img || '/placeholder.jpg'}
                                alt={produto.descritivo_produto}
                                width={90}
                                height={80}
                            />
                        </div>

                        <div className={styles.produtoInfo}>
                            <p>{produto.descritivo_produto}</p>

                            {isBuying ? (
                                <div>
                                    <p>Quantidade: {produto.quantidade}</p>
                                </div>
                            ) : (
                                <div className={styles.quantity_container}>
                                    <button
                                        type="button"
                                        onClick={() => handleDecrement(produto.id_produto, produto.quantidade)}
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        value={quantidades[produto.id_produto] ?? produto.quantidade}
                                        onChange={(e) => {
                                            const novaQuantidade = Math.max(1, Number(e.target.value));
                                            handleInputChange(produto.id_produto, novaQuantidade);
                                        }}
                                        onBlur={() => {
                                            const quantidadeFinal = quantidades[produto.id_produto] ?? produto.quantidade;
                                            const safeQuantity = Math.min(
                                                Math.max(1, quantidadeFinal),
                                                produto.estoque_produto
                                            );

                                            if (safeQuantity !== produto.quantidade) {
                                                atualizarQuantidade(produto.id_produto, safeQuantity);
                                            }

                                            setQuantidades((prev) => {
                                                const novo = { ...prev };
                                                delete novo[produto.id_produto];
                                                return novo;
                                            });
                                        }}
                                        min={1}
                                        max={produto.estoque_produto}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleIncrement(
                                            produto.id_produto,
                                            produto.estoque_produto,
                                            produto.quantidade
                                        )}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.prices}>
                        <div>
                            <p>De {produto.preco}</p>
                            <span>Por {produto.preco_descontado}</span>
                        </div>
                        <span
                            className={styles.excluir}
                            onClick={() => removerDoCarrinho(produto.id_produto)}
                        >
                            Excluir
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}