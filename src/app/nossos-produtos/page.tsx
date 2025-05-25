'use client';

import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import { ProductCard } from "../components/product-card-component";
import { ProductFilter } from "../components/product-filter-component";
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { CaretRight, House } from "@phosphor-icons/react";
import { getProduto, type Produto, type ProdutoApi } from "@/services/routes/produtos/page";
import Link from "next/link";

export default function NossosProdutos() {

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        getProduto().then((resp: any) => {
            setProdutos(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    return (
        <div>
            <HeaderComponent />

            <div className={`${styles.route} container_info`}>
                <span>
                    <Link href="/"><House size={20} /></Link>
                    <p>
                        <CaretRight size={14} />
                        Nossos Produtos
                    </p>
                </span>
            </div>

            <div className={`${styles.content} container_info`}>

                <ProductFilter />

                <div className={styles.productContent}>
                    <div className={styles.firstRow}>
                        <span>{produtos.length} produtos encontrados</span>
                    </div>

                    <div className={styles.products}>
                        {produtos.map((product) => (
                            <div key={product.id_prod} className={styles.productWrapper}>
                                <Link key={product.id_prod} href={`/produto/${product.id_prod}`} passHref>
                                    <ProductCard
                                        key={product.id_prod}
                                        name={product.nome_prod}
                                        price={product.preco_produto}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FooterComponent />

        </div>
    )
}