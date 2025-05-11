'use client';
import { Typography, Rating, Button } from "@mui/material";
import { HeaderComponent } from "../components/header-component";
import styles from "./styles.module.scss"
import { House, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { OffersDayComponent } from "../components/offers-day-component";
import { FooterComponent } from "../components/footer-component";

export default function ProductDetails() {
    return (
        <>
            <HeaderComponent />

            <div className={styles.route}>
                <span>
                    <a href="/"><House size={20} /></a>
                    <p>
                        <CaretRight size={14} />
                        Ofertas do dia
                    </p>
                </span>
            </div>

            <div className={styles.content}>

                <div className={styles.firstRow}>
                    <div className={styles.container_imagens}>
                        <Image src={"/products/lavaeseca.png"} alt={"produto"} width={107} height={93} />
                        <Image src={"/products/lavaeseca.png"} alt={"produto"} width={107} height={93} />
                        <Image src={"/products/lavaeseca.png"} alt={"produto"} width={107} height={93} />

                    </div>
                    <div className={styles.imagem_principal}>
                        <Image src={"/products/lavaeseca.png"} alt={"produto"} width={473} height={400} />
                    </div>
                    <div className={styles.descricao}>
                        <div className={styles.text}>
                            <h1>Lava e Seca Philco 16 Programas Eco Inverter 10 kg Inox PLS11T</h1>
                            <Rating name="read-only" value={5} readOnly />
                            <p className={styles.preco_original}>De R$4.094,00</p>
                            <div className={styles.preco}>
                                <p className={styles.preco_atual}>Por R$2.880,47</p>
                                <span>29% OFF</span>
                            </div>
                            <p className={styles.parcelas}>em 8x de até R$400,00 sem juros no cartão de crédito</p>
                        </div>

                        <div >
                            <p className={styles.estoque}>Em estoque</p>
                            {/* <input type="submit" value="Continuar a compra" className={styles.continuar} /> */}

                            <a href="/"><Button variant="contained" href="/" sx={{
                                backgroundColor: "var(--secondary-color)", width: "486.43px", height: "56px", marginTop: "15px", textTransform: "none", color: "black", boxShadow: 'none',
                            }}>Continuar a compra</Button></a>

                            <a href="/"><Button variant="contained" href="/" sx={{
                                backgroundColor: "var(--primary-color)", width: "486.43px", height: "56px", marginTop: "15px", textTransform: "none", boxShadow: 'none',
                            }}>Adicionar ao carrinho</Button></a>

                            {/* <input type="submit" value="Adicionar ao carrinho" className={styles.carrinho} /> */}
                        </div>


                    </div>
                </div>

                <div className={styles.secondRow}>
                    <h2>Informações do produto</h2>
                    <p>Lavadora Digital Inverter Samsung WW11T Inox 11kg A lavadora com menor consumo de água do mercado A lavadora Samsung WW11T consome menos água por ciclo quando comparadas com outros modelos de mesma capacidade disponíveis no mercado, segundo testes do Inmetro. Economia para você e menos impacto no planeta. Praticidade e rapidez A WW11T lava e centrifuga as roupas em 15 minutos no ciclo rápido destinado a pequenas cargas, com sujeira leve. Delicadeza para não danificar os tecidos O design em forma de diamante do tambor da lavadora Samsung é delicado com as suas roupas. Seus pequenos orifícios para escape da água também ajudam a proteger os tecidos, reduzindo o atrito e prevenindo que suas roupas desfiem durante a lavagem. Livre de resíduos Dispenser projetado com um sistema de passagem de água que facilita a saída do sabão e do amaciante, mantendo-o sempre limpo e evitando desperdício de insumos. Sua máquina sempre limpa Mantenha sua máquina limpa de maneira ecológica. A lavagem do Tambor Eco remove bactérias causadoras de odor do tambor sem usar produtos químicos e ainda ajuda na manutenção do seu produto.</p>
                </div>

                <div className={styles.thirdRow}>
                    <OffersDayComponent />
                </div>
            </div>
            <FooterComponent />
        </>
    )
}