'use client';

import { Link, Star } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface ProductCardProps{
    name: string;
    price?: string;
    oldPrice?: string;
    promo?: number;
}

export function ProductCardPromo({name, price, oldPrice, promo} : ProductCardProps) {
    
    return (
        <div className={styles.content}>
              {/* <Link href={'/produto'} className={styles.content}> */}
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
                                <span>{promo}%</span>
                            </div>
                        </div>
                        <div className={styles.oldPrice}>
                            <span>{oldPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Link> */}
        </div>
    )
}