'use client';

import Image from 'next/image'
import styles from './styles.module.scss'
import { Heart, MagnifyingGlass, MapPin, ShoppingCart, User } from '@phosphor-icons/react'
import { IconButton, InputBase, Paper, TextField } from '@mui/material'

export function HeaderComponent() {
    return (
        <div className={styles.content}>
            <div className={styles.firstRow}>
                <div>
                    <Image src={"/images/logo.png"} alt={''} width={80} height={70}>
                    </Image>
                </div>
                <div>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: 550, borderRadius: '8px' }}
                    >
                        <IconButton type="button" sx={{ p: '8px' }} aria-label="search">
                            <MagnifyingGlass size={16} />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: "12px", marginTop: 0.4 }}
                            placeholder="Busca no Humberto"
                            inputProps={{ 'aria-label': 'Busca no Humbertos' }}
                        />
                    </Paper>

                </div>
                <div className={styles.icons}>
                    <Heart size={24} color="var(--primary-color)" style={{ cursor: "pointer" }} />
                    <a href="/carrinho-de-compras"><ShoppingCart size={24} color="var(--primary-color)" style={{ cursor: "pointer" }} /></a>
                <div className={styles.profile}>
                    <a href="/login"><p>
                        Faça login <br /> ou cadastre-se
                    </p></a>
                    <div className={styles.userProfile}>
                        <User size={24} color='white' />
                    </div>
                </div>
                </div>
            </div>


            {/* localização e menus */}
            <div className={styles.secondRow}>
                <div className={styles.location}>
                    {/* CEP */}
                    <MapPin size={20} color="var(--primary-color)" />
                    <p>Informe seu <span>CEP</span></p>
                </div>
                <div className={styles.menu}>
                    {/* Menu */}
                    <a href='/#categorias'>Categorias</a>
                    <a href='/#ofertas-dia'>Ofertas do dia</a>
                    <a href='/#mais-vendidos'>Mais vendidos</a>
                    {/* <a href='/'>Frete grátis</a> */}
                    <a href='/#fique-dentro'>Fique por dentro</a>
                </div>
            </div>
        </div>
    )
}