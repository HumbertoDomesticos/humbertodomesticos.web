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

                    <div className={styles.produto}>
                        <div className={styles.produtoAll}>
                            <div>
                                <Image src={"/products/lavaeseca.png"} alt={""} width={90} height={80} />
                            </div>

                            <div className={styles.produtoInfo}>
                                <p>Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T</p>
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

                            </div>
                        </div>

                        <div className={styles.prices}>
                            <div>
                                <p>De R$4.094,00</p>
                                <span>Por R$2.880,47</span>
                            </div>
                            <span className={styles.excluir}>Excluir</span>
                        </div>

                    </div>

                </div>

                <div className={styles.containerCompra}>
                    <h1>Resumo da compra</h1>

                    <div className={styles.produtoResumo}>
                        <div>
                            <div className={styles.aside}>
                                <p>Produto (1)</p>
                                <p>R$2.880,47</p>
                            </div>
                            <div className={styles.aside}>
                                <p>Frete</p>
                                <p>Grátis</p>
                            </div>
                        </div>

                        <div className={styles.aside}>
                            <span>Total</span>
                            <span>R$2.880,47</span>
                        </div>

                        <Button variant="contained" href="/" sx={{
                            backgroundColor: "var(--primary-color)", boxShadow: 'none',
                            textTransform: "none"
                        }}>Continuar a compra</Button>
                    </div>
                </div>
            </div>

            <OffersDayComponent produtos={produtos} />

            <FooterComponent />
        </div>
    )
}