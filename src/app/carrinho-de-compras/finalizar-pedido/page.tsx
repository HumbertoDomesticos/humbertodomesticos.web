"use client";

import { HeaderComponent } from "@/app/components/header-component";
import styles from "./style.module.scss";
import { CaretRight, House } from "@phosphor-icons/react";
import Link from "next/link";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useState } from "react";
import { Button } from "@mui/material";
import ProdutoParaComprar from "@/app/components/buying-product-component/page";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function FinalizarPedido() {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <HeaderComponent />

            <div className={`${styles.route} container_info`}>
                <span>
                    <Link href="/"><House size={20} /></Link>
                    <Link href="/carrinho-de-compras"><p><CaretRight size={14} />Meu carrinho</p></Link>
                    <p><CaretRight size={14} />Finalizar pedido</p>
                </span>
            </div>

            <div className={`${styles.content} container_info`}>
                <div className={styles.section}>
                    <h1>Endereço de entrega</h1>
                </div>

                <div className={styles.section}>
                    <h1>Produtos pedidos</h1>
                    <ProdutoParaComprar isBuying={true} />
                </div>

                <div className={styles.section}>
                    <h1>Método de pagamento</h1>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Pix" {...a11yProps(0)} />
                            <Tab label="Boleto bancário" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Button variant="contained" sx={{
                            backgroundColor: "var(--primary-color)", boxShadow: 'none',
                            textTransform: "none"
                        }}>Emitir boleto</Button>
                    </CustomTabPanel>

                    <div>
                        <p>Produto (1)</p>
                        <p>R$2.880,47</p>
                        <p>Frete</p>
                        <p>Grátis</p>
                    </div>
                    <div>
                        <span>Total</span>
                        <span>R$2.880,47</span>
                    </div>
                </div>
            </div>
        </div>
    )
}