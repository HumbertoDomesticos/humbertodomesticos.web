'use client';

import { Link, Star } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { IImage } from "@/services/routes/produtos/page";

interface ProductCardProps {
    name: string;
    price: string;
    image: IImage[];
}

export function ProductCard({ name, price, image }: ProductCardProps) {
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
        <div className={styles.content}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <Image src={image[0].url_img} alt={""} width={180} height={165} />
                </div>
                <div className={styles.cardDescription}>
                    {/* <div className={styles.cardStars}>
                        <div className={styles.stars}>
                            <Star size={18} />
                            <Star size={18} />
                            <Star size={18} />
                            <Star size={18} />
                            <Star size={18} />
                        </div>
                        <p>5.0</p>
                    </div> */}
                    <div>
                        <h1>{name}</h1>
                    </div>
                    {/* <div>
                        <p>em 8x de até R$400,00 sem juros no cartão de crédito</p>
                    </div> */}
                    <div className={styles.cardPrice}>
                        <div className={styles.cardNewPrice}>
                            <h2>{formatarPreco(price)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}