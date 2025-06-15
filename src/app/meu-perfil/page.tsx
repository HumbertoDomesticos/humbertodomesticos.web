"use client";

import { Button } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";

import styles from "./styles.module.scss";
import {
  Note,
  PencilSimpleLine,
  ShoppingCart,
  User,
} from "@phosphor-icons/react";

import {
  type Usuario,
  getUsuario,
  getUsuarioPorEmail,
} from "@/services/routes/usuarios/page";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useProduto } from "../context/ProdutosContext";

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario[]>();

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

  const { user, logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("user");
    if (!storedEmail) {
      router.replace("/login");
      return;
    }
    console.log(localStorage.getItem("user"))
  }, [router]);

  useEffect(() => {
    getUsuario()
      .then((resp: Usuario[]) => {
        setUsuario(resp);
        const usuarioFiltrado = resp.find(
          (u) => u.email_usuario === user?.email_usuario
        );
        if (usuarioFiltrado) {
          setUsuarioLogado(usuarioFiltrado);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  console.log(usuario?.map((u) => u.id_usuario))

  return (
    <>
      <HeaderComponent />
      <div className={`${styles.container} container_info`}>
        <div className={styles.first_column}>
          <div className={styles.user_info}>
            <User size={32} />
            <div className={styles.user}>
              <p>{usuarioLogado?.nome_usuario}</p>

              <div className={styles.user_editar}>
                <PencilSimpleLine size={18} />
                <span>Editar perfil</span>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.user_editar}>
              <User size={16} />
              <p>Minha conta</p>
            </div>
          </div>
        </div>

        <div className={styles.second_column}>
          <h1>Meu perfil</h1>
          <span>Altere seus dados</span>

          <div className={styles.content}>
            <div className={styles.info_all}>
              <div className={styles.user_info}>
                <p>Nome</p>
                <p>E-mail</p>
                <p>Telefone</p>
                <p>Sexo</p>
                <p>CPF</p>
              </div>

              <div className={styles.user}>
                <div className={styles.flex}>
                  <p>{usuarioLogado?.nome_usuario}</p>
                  <PencilSimpleLine size={16} />
                </div>

                <div className={styles.flex}>
                  <p>{usuarioLogado?.email_usuario}</p>
                  <PencilSimpleLine size={16} />
                </div>

                <div className={styles.flex}>
                  <p>(14) 9 9***-**82</p>
                  <PencilSimpleLine size={16} />
                </div>

                <div className={styles.flex}>
                  <p>{usuarioLogado?.genero_usuario}</p>
                  <PencilSimpleLine size={16} />
                </div>

                <div className={styles.flex}>
                  <p>{usuarioLogado?.cpf}</p>
                  <PencilSimpleLine size={16} />
                </div>
              </div>
            </div>
            {/* 
                        <div className={styles.profile_picture}>
                            <Button variant="contained" href="/" sx={{
                                backgroundColor: "var(--secondary-color)", boxShadow: 'none', color: 'black',
                                textTransform: "none", width: "220px"
                            }}>Selecionar foto</Button>

                            <p>Tamanho do arquivo: no máximo 1 MB
                                Extensão de arquivo: .JPEG, .PNG</p>
                        </div> */}
          </div>

          <div className={styles.button}>
            <Button
              variant="contained"
              href="/"
              sx={{
                backgroundColor: "var(--primary-color)",
                boxShadow: "none",
                textTransform: "none",
                width: "220px",
              }}
            >
              Salvar
            </Button>
          </div>

          <div className={styles.button}>
            <Button
              variant="contained"
              href="/"
              onClick={logout}
              sx={{
                backgroundColor: "#e50000",
                boxShadow: "none",
                textTransform: "none",
                width: "220px",
              }}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
