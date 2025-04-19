'use client';

import Image from 'next/image'
import styles from './styles.module.scss'
import { Heart, MagnifyingGlass, MapPin, ShoppingCart, User } from '@phosphor-icons/react'
import { IconButton, InputBase, Paper, TextField } from '@mui/material'

export function HeaderComponent() {
    return (
        <div className={styles.content}>
            {/* Logo, pesquisa, favoritos, carrinho e perfil */}
            <div className={styles.firstRow}>
                <div>
                    {/* logo */}
                    <Image src={"/images/logo.png"} alt={''} width={80} height={70}>
                    </Image>
                </div>
                <div>
                    {/* Pesquisa */}
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: 500, borderRadius: '8px' }}
                    >
                        <IconButton type="button" sx={{ p: '8px' }} aria-label="search">
                            <MagnifyingGlass size={16} />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: "12px", marginTop: 0.4}}
                            placeholder="Busca no Humberto"
                            inputProps={{ 'aria-label': 'Busca no Humbertos' }}
                        />
                    </Paper>

                </div>
                <div className={styles.icons}>
                    {/* Ícones */}
                    <Heart size={24} color="var(--primary-color)" style={{cursor: "pointer"}}/>
                    <ShoppingCart size={24} color="var(--primary-color)" style={{cursor: "pointer"}}/>
                </div>
                <div className={styles.profile}>
                    {/* Perfil */}
                    <p>
                        Faça login <br/> ou cadastre-se
                    </p>
                    <div className={styles.userProfile}>
                        <User size={24} color='white' />
                    </div>
                </div>
            </div>

            {/* <div></div>
            <div></div> */}

            {/* localização e menus */}
            <div className={styles.secondRow}>
                <div className={styles.location}>
                    {/* CEP */}
                    <MapPin size={20} color="var(--primary-color)" />
                    <p>Informe seu <span>CEP</span></p>
                </div>
                <div className={styles.menu}>
                    {/* Menu */}
                    <p>Categorias</p>
                    <p>Ofertas do dia</p>
                    <p>Mais vendidos</p>
                    <p>Frete grátis</p>
                    <p>Fique por dentro</p>
                </div>
            </div>
        </div>
    )
}