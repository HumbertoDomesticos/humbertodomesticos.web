"use client";

import { Button } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";

import styles from "./styles.module.scss"
import { Note, PencilSimpleLine, ShoppingCart, User } from "@phosphor-icons/react";

import { type Usuario, getUsuario, getUsuarioPorEmail } from "@/services/routes/usuarios/page";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


export default function Perfil() {

    const [usuario, setUsuario] = useState<Usuario[]>();

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

    const { user } = useAuth()

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
        <>
            <HeaderComponent />
            <div className={`${styles.container} container_info`}>
                {/* 
                {JSON.stringify(user?.email_usuario)}
                {JSON.stringify(usuario?.map((u) => u.email_usuario === user?.email_usuario))}
                {JSON.stringify(usuarioLogado)} */}

                <div className={styles.first_column}>
                    <div className={styles.user_info}>
                        <User size={32} />
                        <div className={styles.user}>
                            <p>{usuarioLogado?.nome_usuario}</p>
                            {/* <p>Aléxia Cazale</p> */}

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
                        {/* <div className={styles.user_editar}>
                            <Note size={16} />
                            <p>Minhas compras</p>
                        </div> */}
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
                                    {/* <p>Aléxia Cazale</p> */}
                                    <PencilSimpleLine size={16} />
                                </div>

                                <div className={styles.flex}>
                                    <p>{usuarioLogado?.email_usuario}</p>
                                    {/* <p>alexiacazale7@gmail.com</p> */}
                                    <PencilSimpleLine size={16} />
                                </div>

                                <div className={styles.flex}>
                                    <p>(14) 9 9***-**82</p>
                                    <PencilSimpleLine size={16} />
                                </div>
                                <div className={styles.genero}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >

                                        <FormControlLabel value="female" control={<Radio />} label="Feminino" />
                                        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                                        <FormControlLabel value="other" control={<Radio />} label="Outro" />
                                    </RadioGroup>

                                </div>
                                <div className={styles.flex}>
                                    {/* <p>06*.***.**-*0</p> */}
                                    <p>{usuarioLogado?.cpf_usuario}</p>
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
                        <Button variant="contained" href="/" sx={{
                            backgroundColor: "var(--primary-color)", boxShadow: 'none',
                            textTransform: "none", width: "220px"
                        }}>Salvar</Button>
                    </div>


                </div>
            </div>
            <FooterComponent />
        </>
    )
}