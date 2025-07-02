"use client";
import {
  Typography,
  Rating,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { HeaderComponent } from "../../components/header-component";
import styles from "./styles.module.scss";
import { House, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { OffersDayComponent } from "../../components/offers-day-component";
import { FooterComponent } from "../../components/footer-component";
import { useEffect, useState } from "react";
import { getProduto, type Produto } from "@/services/routes/produtos/page";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useProduto } from "@/app/context/ProdutosContext";
import {
  getPedidoAberto,
  postProdutoEmPedido,
} from "@/services/routes/pedidos/page";

export default function ProductDetails() {
  const {
    atualizarQuantidade,
    removerDoCarrinho,
    adicionarAoCarrinho,
    quantidadeItens,
  } = useProduto();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);
  const [data, setData] = useState<Produto[]>([]);
  const [quantity, setQuantity] = useState("1");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    getProduto()
      .then((resp: any) => {
        setData(resp);
        const found = resp.find((p: Produto) => p.id_produto === productId);
        if (found) {
          setSelectedImage(found.imagens[0].url_img);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  const product = data.find((p) => p.id_produto === productId);

  if (!product) {
    return <p>Carregando produto...</p>;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value as string);
  };

  const handleAdicionarAoCarrinho = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    try {
      const quantidade = Number(quantity);
      await getPedidoAberto(user?.id_usuario!);
      await postProdutoEmPedido(user?.id_usuario!, productId, quantidade);

      alert(
        `${quantidade} unidade(s) de ${product.descritivo_produto} adicionada(s) ao carrinho!`
      );

      adicionarAoCarrinho(product);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

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
    <>
      <HeaderComponent />

      <div className={`${styles.route} container_info`}>
        <span>
          <Link href="/">
            <House size={20} />
          </Link>
          <p>
            <CaretRight size={14} />
            Ofertas do dia
          </p>
        </span>
      </div>

      <div className={`${styles.content} container_info`} key={product.id_produto}>
        <div className={styles.firstRow}>
          <div className={styles.container_imagens}>
            {product.imagens.map((img) => (
              <Image
                key={img.url_img}
                src={img.url_img}
                alt="produto"
                width={107}
                height={93}
                onClick={() => setSelectedImage(img.url_img)}
                style={{
                  cursor: "pointer",
                  border: selectedImage === img.url_img ? "2px solid var(--primary-color)" : "none",
                }}
              />
            ))}
          </div>

          <div className={styles.imagem_principal}>
            <Image
              src={selectedImage || product.imagens[0].url_img}
              alt="produto"
              width={473}
              height={400}
            />
          </div>

          <div className={styles.descricao}>
            <div className={styles.text}>
              <h1>{product.descritivo_produto}</h1>
              {/* <Rating name="read-only" value={5} readOnly /> */}
              <p style={{ color: "var(--primary-color)" }}>{product.categorias?.map((e) => e.descritivo_categoria)}</p>
              <p className={styles.preco_atual}>Por {formatarPreco(product.preco_descontado)}</p>
            </div>
            {product.estoque_produto > 0 ? (
              <div>
                <Box sx={{ minWidth: 120, width: "486.43px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Quantidade: </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={quantity}
                      label="Quantidade"
                      onChange={handleChange}
                    >
                      {Array.from({ length: Math.min(product.estoque_produto, 7) }, (_, i) => (
                        <MenuItem key={i + 1} value={String(i + 1)}>
                          {i + 1} unidade{i + 1 > 1 ? "s" : ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>


                <div>
                  <div className={styles.estoqueStyle}>
                    <p className={styles.estoque}><b>Em estoque:</b></p>
                    <p className={styles.estoque}>
                      {product.estoque_produto} unidades restantes
                    </p>
                  </div>

                  <Button
                    variant="contained"
                    href="/"
                    sx={{
                      backgroundColor: "var(--secondary-color)",
                      width: "486.43px",
                      height: "56px",
                      marginTop: "15px",
                      textTransform: "none",
                      color: "black",
                      boxShadow: "none",
                    }}
                  >
                    Continuar a compra
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      width: "486.43px",
                      height: "56px",
                      marginTop: "15px",
                      textTransform: "none",
                      boxShadow: "none",
                    }}
                    onClick={handleAdicionarAoCarrinho}
                  >
                    Adicionar ao carrinho
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.semEstoque}>
                <Image
                  src="/images/1.png"
                  alt="Logo da Loja"
                  width={200}
                  height={200}
                  priority
                />
                <span style={{ fontSize: "18px" }}>O produto está indisponível no momento!</span>
              </div>

            )}
          </div>
        </div>

        <div className={styles.secondRow}>
          <h2>Informações do produto</h2>
          <p>{product.descricao_produto}</p>
        </div>

        <div className={styles.thirdRow}>
          <OffersDayComponent produtos={data} />
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
