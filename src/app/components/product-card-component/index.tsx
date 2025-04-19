'use client';

import { Star } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import Image from "next/image";

export const productList = [
    {
        id: 0,
        name: "Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T",
        price: "R$2.880,4",
        oldPrice: "R$4.094,00",
        image: "/products/lavaeseca.png"
    },
    {
        id: 1,
        name: "Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T",
        price: "R$2.880,4",
        oldPrice: "R$4.094,00",
        image: "/products/lavaeseca.png"
    },
    {
        id: 2,
        name: "Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T",
        price: "R$2.880,4",
        oldPrice: "R$4.094,00",
        image: "/products/lavaeseca.png"
    },
    {
        id: 3,
        name: "Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T",
        price: "R$2.880,4",
        oldPrice: "R$4.094,00",
        image: "/products/lavaeseca.png"
    },
    {
        id: 4,
        name: "Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T",
        price: "R$2.880,4",
        oldPrice: "R$4.094,00",
        image: "/products/lavaeseca.png"
    },

]

interface ProductCardProps{
    name: string;
    price: string;
    oldPrice: string;
}

export function ProductCard({name, price, oldPrice} : ProductCardProps) {
    return (
        <div className={styles.content}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    {/* Imagem do produto */}
                    <Image src={"/products/lavaeseca.png"} alt={""} width={180} height={165} />
                </div>
                <div className={styles.cardDescription}>
                    {/* Descrição */}
                    <div className={styles.cardStars}>
                        {/* Avaliação */}
                        <div className={styles.stars}>
                            <Star size={18} />
                            <Star size={18} />
                            <Star size={18} />
                            <Star size={18} />
                            <Star size={18} />
                        </div>
                        <p>5.0</p>
                    </div>
                    <div>
                        {/* Nome */}
                        <h1>{name}</h1>
                    </div>
                    <div>
                        {/* Parcelas */}
                        <p>em 8x de até R$400,00 sem juros no cartão de crédito</p>
                    </div>
                    <div className={styles.cardPrice}>
                        {/* Preço */}
                        <div className={styles.cardNewPrice}>
                            <h2>{price}</h2>
                            <div className={styles.discount}>
                                <span>29%</span>
                            </div>
                        </div>
                        <div className={styles.oldPrice}>
                            <span>{oldPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}