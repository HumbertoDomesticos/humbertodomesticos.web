"use client";

import { Button, Link, styled } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import { OffersDayComponent } from "../components/offers-day-component";
import styles from "./styles.module.scss";
import Image from "next/image";
import { House, CaretRight } from "@phosphor-icons/react";
import { type Produto, getProduto } from "@/services/routes/produtos/page";
import { useState, useEffect } from "react";
import ProdutoParaComprar from "../components/buying-product-component/page";
import { useProduto } from "../context/ProdutosContext";

export default function CarrinhoCompras() {
  const { carrinho, removerDoCarrinho, limparCarrinho, quantidadeItens } =
    useProduto();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    getProduto()
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .then((resp: any) => {
        setProdutos(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calcularSubtotal = () => {
    return carrinho.reduce((total, produto) => {
      const preco =
        Number(
          produto.desconto_preco_produto
            ?.toString()
            .replace("R$", "")
            .replace(",", ".")
            .trim()
        ) || 0;
      const quantidade = produto.quantidade || 1;
      return total + preco * quantidade;
    }, 0);
  };

  const subtotal = calcularSubtotal();
  const frete = 0; // pode ser alterado no futuro
  const total = subtotal + frete;

  return (
    <div>
      <HeaderComponent />

      <div className={`${styles.route} container_info`}>
        <span>
          <a href="/">
            <House size={20} />
          </a>
          <p>
            <CaretRight size={14} />
            Meu carrinho
          </p>
        </span>
      </div>

      {carrinho.length === 0 ? (
        <>
          <div className={`${styles.container} container_info`}>
            <Image src={"/carrinho.png"} alt={""} width={144} height={144} />
            <div className={styles.carrinho_vazio}>
              <span>Seu carrinho de compras está vazio</span>
              <Button
                variant="contained"
                href="/"
                sx={{
                  backgroundColor: "var(--primary-color)",
                  boxShadow: "none",
                  textTransform: "none",
                }}
              >
                Ir às compras
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.contentCarrinho} container_info`}>
            <div className={styles.containerCarrinho}>
              <h1>Seus produtos</h1>

              <ProdutoParaComprar isBuying={false} />
            </div>

            <div className={styles.containerCompra}>
              <h1>Resumo da compra</h1>

              <div className={styles.produtoResumo}>
                <div>
                  <div className={styles.aside}>
                    <p>Produto ({quantidadeItens})</p>
                    <p>R$ {subtotal.toFixed(2).replace(".", ",")}</p>
                  </div>
                  <div className={styles.aside}>
                    <p>Frete</p>
                    <p>Grátis</p>
                  </div>
                </div>

                <div className={styles.aside}>
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>

                <Link href="/carrinho-de-compras/finalizar-pedido">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      boxShadow: "none",
                      textTransform: "none",
                    }}
                  >
                    Continuar a compra
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <OffersDayComponent produtos={produtos} />

      <FooterComponent />
    </div>
  );
}
