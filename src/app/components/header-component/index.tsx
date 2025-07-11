"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import {
  Heart,
  MagnifyingGlass,
  MapPin,
  ShoppingCart,
  User,
} from "@phosphor-icons/react";
import {
  Avatar,
  Badge,
  badgeClasses,
  IconButton,
  InputBase,
  Paper,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { type Usuario, getUsuario } from "@/services/routes/usuarios/page";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useProduto } from "@/app/context/ProdutosContext";
import { Produto } from "@/services/routes/produtos/page";
import { getPedidoAberto } from "@/services/routes/pedidos/page";
import { AddressInputs } from "../add-address/page";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export function HeaderComponent() {
  const { isAuthenticated, user, logout } = useAuth();

  const { carrinho, removerDoCarrinho, limparCarrinho, quantidadeItens } =
    useProduto();

  const [usuario, setUsuario] = useState<Usuario[]>();

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

  const router = useRouter();

  const [pedido, setPedido] = useState<Produto[]>([]);

  const [showAddress, setShowAddress] = useState(false)
  const handleOpenAddress = () => setShowAddress(true)
  const handleCloseAddress = () => setShowAddress(false)

  useEffect(() => {
    if (!user?.id_usuario) {
      return;
    }

    const fetchPedidoAberto = async () => {
      try {
        const response = await getPedidoAberto(user?.id_usuario!);
        // Extract products from the order response
        const produtos = response.data.produtos_em_pedido.map((item) => ({
          ...item.produto,
          quantidade: item.quant_produto_em_pedido,
        }));

        setPedido(produtos);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchPedidoAberto();
  }, [user?.id_usuario, carrinho]);

  let quantidade = 0;

  let qtdApi = pedido.map((p) => p.quantidade)

  for (let i = 0; i < qtdApi.length; i++) {
    quantidade += qtdApi[i];
    console.log(i)
    console.log(quantidade)
  }

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
              display: "flex",
              alignItems: "center",
              width: 580,
              borderRadius: "8px",
            }}
          >
            <IconButton type="button" sx={{ p: "8px" }} aria-label="search">
              <MagnifyingGlass size={16} />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "12px",
                marginTop: 0.4,
              }}
              placeholder="Busca no Humberto"
              inputProps={{ "aria-label": "Busca no Humbertos" }}
            />
          </Paper>
        </div>

        <div className={styles.icons}>
          {/* <Heart
            size={24}
            color="var(--primary-color)"
            style={{ cursor: "pointer" }}
          /> */}

          <Link href="/carrinho-de-compras">
            <ShoppingCart
              size={24}
              color="var(--primary-color)"
              style={{ cursor: "pointer" }}
            />

            {pedido.map((p) => p.quantidade > 0 && (
              <CartBadge
                key={p.id_produto}
                badgeContent={quantidade}
                color="primary"
                overlap="circular"
              />

            ))}
          </Link>

          {isAuthenticated ? (
            <div className={styles.profile}>
              <div className={styles.userInfo}>
                <p>{user?.nome_usuario}</p>
              </div>
              <div className={styles.userProfile}>
                <Link href="/meu-perfil">
                  <Avatar sx={{ bgcolor: "var(--primary-color)", width: 34, height: 34 }}></Avatar>
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
                  <Avatar sx={{ bgcolor: "var(--primary-color)",  width: 34, height: 34 }}></Avatar>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção de localização e menus */}
      <div className={styles.secondRow}>
        {/* <div className={styles.location}>
          <MapPin size={20} color="var(--primary-color)" />
          <p onClick={handleOpenAddress} style={{ cursor: "pointer" }}>
            Informe seu <span>CEP</span>
          </p>

          {showAddress && <AddressInputs handleClose={handleCloseAddress} />}
        </div> */}

        <div className={styles.menu}>
          <Link href="/quem-somos">Sobre nós</Link>
          <Link href="/#categorias">Categorias</Link>
          <Link href="/#ofertas-dia">Ofertas do dia</Link>
          <Link href="/#mais-vendidos">Nossos Produtos</Link>
          <Link href="/#fique-dentro">Fique por dentro</Link>
        </div>
      </div>
    </div>
  );
}
