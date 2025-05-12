'use client';

import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import { ProductCard, productList } from "../components/product-card-component";
import { ProductFilter } from "../components/product-filter-component";
import styles from './styles.module.scss';
import { useState } from "react";
import { CaretRight, House } from "@phosphor-icons/react";

export default function NossosProdutos() {

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div>
            <HeaderComponent />

            <div className={`${styles.route} container_info`}>
                <span>
                    <a href="/"><House size={20} /></a>
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
                        <span>{productList.length} produtos encontrados</span>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Relevância</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Relevância" />}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className={styles.products}>

                        {productList.map((product) => (
                            <div key={product.id} className={styles.productWrapper}>
                                <ProductCard
                                    name={product.name}
                                    price={product.price}
                                    oldPrice={product.oldPrice}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <FooterComponent />

        </div>
    )
}