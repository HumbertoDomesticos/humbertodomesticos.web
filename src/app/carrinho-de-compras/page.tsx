'use client';

import { Button, Link, styled } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import { OffersDayComponent } from "../components/offers-day-component";
import styles from "./styles.module.scss";
import Image from "next/image";
import { House, CaretRight } from "@phosphor-icons/react";

export default function CarrinhoCompras() {

    return (
        <div>
            <HeaderComponent />
            {/* rota */}

            <div className={`${styles.route} container_info`}>
                <span>
                    <a href="/"><House size={20} /></a>
                    <p>
                        <CaretRight size={14} />
                        Meu carrinho
                    </p>
                </span>
            </div>

            {/* carrinho info */}
            <div className={`${styles.container} container_info`}>
                <Image src={"/carrinho.png"} alt={""} width={144} height={144} />
                <div className={styles.carrinho_vazio}>
                    <span>Seu carrinho de compras está vazio</span>
                    <Button variant="contained" href="/" sx={{
                        backgroundColor: "var(--primary-color)", boxShadow: 'none',
                        textTransform: "none"
                    }}>Ir às compras</Button>
                </div>

            </div>

            {/* ofertas */}
            <OffersDayComponent />

            <FooterComponent />
        </div>
    )
}