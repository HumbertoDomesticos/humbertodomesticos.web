import Image from "next/image";
import styles from "./styles.module.scss";
import { useProduto } from "@/app/context/ProdutosContext";
import { Produto } from "@/services/routes/produtos/page";
import { getPedidoAberto, PutQuantidade } from "@/services/routes/pedidos/page";
import { useAuth } from "@/app/context/AuthContext";
import { IPedidos } from "@/services/routes/pedidos/page";
import react from "react";
import { ProdutoVM } from "@/viewmodel/produto_vm";

interface ProdutoParaComprarProps {
  isBuying: boolean;
}

export default function ProdutoParaComprar({
  isBuying,
}: ProdutoParaComprarProps) {
  const { carrinho, atualizarQuantidade, removerDoCarrinho } = useProduto();
  const { user } = useAuth();

  const [produtosCarrinho, setProdutosCarrinho] = react.useState<Produto[]>([]);
  const [loading, setLoading] = react.useState(true);
  const [error, setError] = react.useState<string | null>(null);
  const [quantidades, setQuantidades] = react.useState<{
    [id: number]: number;
  }>({});

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
        const produtos = response.data.produtos_em_pedido.map((item) => ({
          ...item.produto,
          quantidade: item.quant_produto_em_pedido,
        }));

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

  const handleIncrement = async (
    produtoId: number,
    estoque: number,
    quantidadeAtual: number
  ) => {
    const novaQuantidade = quantidadeAtual + 1;

    if (novaQuantidade <= estoque) {
      await PutQuantidade(user?.id_usuario!, produtoId, novaQuantidade);
      atualizarQuantidade(produtoId, novaQuantidade);
      setQuantidades((prev) => ({ ...prev, [produtoId]: novaQuantidade }));
      setProdutosCarrinho((prev) =>
        prev.map((p) =>
          p.id_produto === produtoId ? { ...p, quantidade: novaQuantidade } : p
        )
      );



    }
    console.log("aoba ", produtoId);
  };

  const handleDecrement = async (
    produtoId: number,
    quantidadeAtual: number
  ) => {
    const novaQuantidade = quantidadeAtual - 1;

    if (novaQuantidade >= 1) {
      await PutQuantidade(user?.id_usuario!, produtoId, novaQuantidade);
      atualizarQuantidade(produtoId, novaQuantidade);
      setQuantidades((prev) => ({ ...prev, [produtoId]: novaQuantidade }));
      setProdutosCarrinho((prev) => {

        return prev.map((p) =>

          p.id_produto === produtoId ? { ...p, quantidade: novaQuantidade } : p
        )
      }
      );

    } else {
      await PutQuantidade(user?.id_usuario!, produtoId, 0);
      removerDoCarrinho(produtoId);
    }
  };

  if (loading) return <div className={styles.loading}>Loading cart...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (produtosCarrinho.length === 0)
    return <div className={styles.empty}>Your cart is empty</div>;

  const formatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function formatarPreco(valor: string): string {
    const numero = Number(
      valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
    );
    return `R$ ${formatter.format(numero)}`;
  }

  return (
    <div className={styles.produto}>
      {/* {JSON.stringify(produtosCarrinho.map((e) => e))} */}
      {produtosCarrinho.map((produto) => (
        <div className={styles.pai} key={produto.id_produto}>
          <div className={styles.produtoAll}>
            <div>
              <Image
                src={produto.imagens[0]?.url_img || "/placeholder.jpg"}
                alt={produto.descritivo_produto}
                width={90}
                height={80}
              />
            </div>

            <div className={styles.produtoInfo}>
              <p>{produto.descritivo_produto}</p>

              {isBuying ? (
                <div>
                  <b> <p>Quantidade: {produto.quantidade}</p></b>
                </div>
              ) : (
                <div className={styles.quantity_container}>
                  <button
                    type="button"
                    onClick={() =>
                      handleDecrement(
                        produto.id_produto,
                        quantidades[produto.id_produto] ?? produto.quantidade
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantidades[produto.id_produto] !== undefined
                      ? quantidades[produto.id_produto]
                      : produto.quantidade
                    }
                    onChange={(e) => {
                      const raw = e.target.value;
                      const parsed = parseInt(raw, 10);

                      if (!isNaN(parsed)) {
                        handleInputChange(produto.id_produto, parsed);
                      } else {
                        handleInputChange(produto.id_produto, 0);
                      }
                    }}


                    onBlur={async () => {
                      const quantidadeFinal =
                        quantidades[produto.id_produto] ?? produto.quantidade;
                      const safeQuantity = Math.min(
                        Math.max(0, quantidadeFinal),
                        produto.estoque_produto
                      );

                      if (safeQuantity === 0) {
                        await PutQuantidade(user?.id_usuario!, produto.id_produto, 0);
                        removerDoCarrinho(produto.id_produto);
                      } else if (safeQuantity !== produto.quantidade) {
                        await PutQuantidade(user?.id_usuario!, produto.id_produto, safeQuantity);
                        atualizarQuantidade(produto.id_produto, safeQuantity);
                      }

                      setQuantidades((prev) => {
                        const novo = { ...prev };
                        delete novo[produto.id_produto];
                        return novo;
                      });

                    }}
                  ></input>


                  <button
                    type="button"
                    onClick={() =>
                      handleIncrement(
                        produto.id_produto,
                        produto.estoque_produto,
                        quantidades[produto.id_produto] ?? produto.quantidade
                      )
                    }
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.prices}>
            <div>
              <p>De {formatarPreco(produto.preco)}</p>
              <span>Por {formatarPreco(produto.preco_descontado)}</span>

            </div>

            {!isBuying && (
              <span
                className={styles.excluir}
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await PutQuantidade(user?.id_usuario!, produto.id_produto, 0);
                  removerDoCarrinho(produto.id_produto);
                  setProdutosCarrinho((prev) =>
                    prev.filter((p) => p.id_produto !== produto.id_produto)
                  );
                }}
              >
                Excluir
              </span>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
