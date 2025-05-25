'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { Heart, MagnifyingGlass, MapPin, ShoppingCart, User } from '@phosphor-icons/react';
import { IconButton, InputBase, Paper } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { type Usuario, getUsuario } from '@/services/routes/usuarios/page';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export function HeaderComponent() {
    const { isAuthenticated, user, logout } = useAuth();


    const [usuario, setUsuario] = useState<Usuario[]>();

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (!storedEmail) {
            router.replace('/login');
            return;
        }

    }, [router]);

    useEffect(() => {
        getUsuario()
            .then((resp: Usuario[]) => {
                setUsuario(resp);
                const usuarioFiltrado = resp.find((u) => u.email_usuario === user?.email_usuario);
                if (usuarioFiltrado) {
                    setUsuarioLogado(usuarioFiltrado);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    return (
        <div className={styles.content}>
            <div className={styles.firstRow}>
                <div>
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="Logo da Loja"
                            width={80}
                            height={70}
                            priority
                        />
                    </Link>
                </div>

                <div>
                    <Paper
                        component="form"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 550,
                            borderRadius: '8px'
                        }}
                    >
                        <IconButton
                            type="button"
                            sx={{ p: '8px' }}
                            aria-label="search"
                        >
                            <MagnifyingGlass size={16} />
                        </IconButton>
                        <InputBase
                            sx={{
                                ml: 1,
                                flex: 1,
                                fontSize: "12px",
                                marginTop: 0.4
                            }}
                            placeholder="Busca no Humberto"
                            inputProps={{ 'aria-label': 'Busca no Humbertos' }}
                        />
                    </Paper>
                </div>

                <div className={styles.icons}>
                    <Heart
                        size={24}
                        color="var(--primary-color)"
                        style={{ cursor: "pointer" }}
                    />

                    <Link href="/carrinho-de-compras">
                        <ShoppingCart
                            size={24}
                            color="var(--primary-color)"
                            style={{ cursor: "pointer" }}
                        />
                    </Link>

                    {isAuthenticated ? (
                        <div className={styles.profile}>
                            <div className={styles.userInfo}>
                                <p>{usuarioLogado?.nome_usuario || 'Usuário'}</p>
                                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                                {/* <button
                                    onClick={logout}
                                    className={styles.logoutButton}
                                >
                                    Sair
                                </button> */}
                            </div>
                            <div className={styles.userProfile}>
                                <Link href="/meu-perfil">
                                    <User size={24} color='white' />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.profile}>
                            <Link href="/login">
                                <p>
                                    Faça login <br />
                                    ou cadastre-se
                                </p>
                            </Link>
                            <div className={styles.userProfile}>
                                <Link href="/login">
                                    <User size={24} color='white' />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Seção de localização e menus */}
            <div className={styles.secondRow}>
                <div className={styles.location}>
                    <MapPin size={20} color="var(--primary-color)" />
                    <p>Informe seu <span>CEP</span></p>
                </div>

                <div className={styles.menu}>
                    <Link href='/quem-somos'>Sobre nós</Link>
                    <Link href='/#ofertas-dia'>Ofertas do dia</Link>
                    <Link href='/#mais-vendidos'>Mais vendidos</Link>
                    <Link href='/#fique-dentro'>Fique por dentro</Link>
                </div>
            </div>
        </div>
    );
}