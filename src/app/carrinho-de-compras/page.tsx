'use client';

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

    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        getProduto().then((resp: any) => {
            setProdutos(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const { carrinho, removerDoCarrinho, limparCarrinho, quantidadeItens } = useProduto();

    console.log(carrinho)

    return (
        <div>
            <HeaderComponent />

            <div className={`${styles.route} container_info`}>
                <span>
                    <a href="/"><House size={20} /></a>
                    <p>
                        <CaretRight size={14} />
                        Meu carrinho
                    </p>
                </span>
            </div>

            {/* Carrinho VAZIO */}
            {/* <div className={`${styles.container} container_info`}>
                    <Image src={"/carrinho.png"} alt={""} width={144} height={144} />
                    <div className={styles.carrinho_vazio}>
                        <span>Seu carrinho de compras está vazio</span>
                        <Button variant="contained" href="/" sx={{
                            backgroundColor: "var(--primary-color)", boxShadow: 'none',
                            textTransform: "none"
                        }}>Ir às compras</Button>
                    </div>
                </div> */}

            {/* Carrinho com produtos */}
            <div className={`${styles.contentCarrinho} container_info`}>

                <div className={styles.containerCarrinho}>
                    <h1>Seus produtos</h1>

                    <ProdutoParaComprar isBuying={false} />

                </div>

                <div className={styles.containerCompra}>
                    <h1>Resumo da compra</h1>

                    {carrinho.map((produto) => (
                        <div className={styles.produtoResumo} key={produto.id_prod}>
                            <div>
                                <div className={styles.aside}>
                                    <p>Produto ({carrinho.length})</p>
                                    <p>{produto.desconto_preco_produto}</p>
                                </div>
                                <div className={styles.aside}>
                                    <p>Frete</p>
                                    <p>Grátis</p>
                                </div>
                            </div>

                            <div className={styles.aside}>
                                <span>Total</span>
                                <span>{produto.desconto_preco_produto}</span>
                            </div>

                            <Button variant="contained" href="/carrinho-de-compras/finalizar-pedido" sx={{
                                backgroundColor: "var(--primary-color)", boxShadow: 'none',
                                textTransform: "none"
                            }}>Continuar a compra</Button>
                        </div>
                    ))}

                </div>
            </div>

            <OffersDayComponent produtos={produtos} />

            <FooterComponent />
        </div>
    )
}