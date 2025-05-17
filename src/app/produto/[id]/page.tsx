'use client';
import { Typography, Rating, Button } from "@mui/material";
import { HeaderComponent } from "../../components/header-component";
import styles from "./styles.module.scss"
import { House, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { OffersDayComponent } from "../../components/offers-day-component";
import { FooterComponent } from "../../components/footer-component";
import { useEffect, useState } from "react";
import { getProduto, type Produto } from "@/services/routes/produtos/page";
import { useParams } from "next/navigation";
import Link from "next/link";


export default function ProductDetails() {

    const params = useParams();
    const productId = Number(params.id); // pegar id da rota

    const [data, setData] = useState<Produto[]>([]);

    useEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        getProduto().then((resp: any) => {
            setData(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const product = data.find(p => p.id_prod === productId);

    if (!product) {
        return <p>Carregando produto...</p>;
    }


    return (
        <>
            <HeaderComponent />

            <div className={`${styles.route} container_info`}>
                <span>
                    <a href="/"><House size={20} /></a>
                    <p>
                        <CaretRight size={14} />
                        Ofertas do dia
                    </p>
                </span>
            </div>


            <div className={`${styles.content} container_info`} key={product.id_prod}>

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
                            <h1>{product.nome_prod}</h1>
                            <Rating name="read-only" value={5} readOnly />

                            <p className={styles.preco_atual}>Por {product.desconto_preco_produto}</p>

                            <p className={styles.parcelas}>em 8x de até R$400,00 sem juros no cartão de crédito</p>
                        </div>

                        <div >
                            <p className={styles.estoque}>Em estoque</p>
                            <p className={styles.estoque}>{product.estoque_prod}</p>
                            {/* <input type="submit" value="Continuar a compra" className={styles.continuar} /> */}

                            <Link href="/" >
                                <Button variant="contained" href="/" sx={{
                                    backgroundColor: "var(--secondary-color)", width: "486.43px", height: "56px", marginTop: "15px", textTransform: "none", color: "black", boxShadow: 'none',
                                }}>Continuar a compra</Button>
                            </Link>

                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "var(--primary-color)", width: "486.43px", height: "56px", marginTop: "15px", textTransform: "none", boxShadow: 'none' }}
                            // onclick={() => handleSaveProduct(productId)}
                            >Adicionar ao carrinho</Button>


                            {/* <input type="submit" value="Adicionar ao carrinho" className={styles.carrinho} /> */}
                        </div>


                    </div>
                </div>

                <div className={styles.secondRow}>
                    <h2>Informações do produto</h2>
                    <p>{product.descricao_prod}</p>
                </div>

                <div className={styles.thirdRow}>
                    <OffersDayComponent produtos={data} />
                </div>

            </div>
            <FooterComponent />
        </>
    )
}