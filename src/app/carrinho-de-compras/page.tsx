'use client';

import { Button, Link } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import { OffersDayComponent } from "../components/offers-day-component";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function CarrinhoCompras() {
    return (
        <div>
            <HeaderComponent />
            {/* rota */}
            <Link href="/">Meu carrinho</Link>

            {/* carrinho info */}
            <div className={styles.container}>
                <Image src={"/carrinho.png"} alt={""} width={144} height={144}/>
                <span>Seu carrinho de compras está vazio</span>
                <Button variant="contained"  href="/">Ir às compras</Button>

            </div>

            {/* ofertas */}
            <OffersDayComponent />

            <FooterComponent />
        </div>
    )
}