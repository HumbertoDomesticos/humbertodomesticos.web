"use client";

import { Button } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";

import styles from "./styles.module.scss"
import { Note, PencilSimpleLine, ShoppingCart, User } from "@phosphor-icons/react";
import { type Usuario, getUsuario } from "@/services/routes/usuarios/page";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function Perfil() {

    const [usuario, setUsuario] = useState<Usuario>();

    useEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        getUsuario().then((resp: any) => {
            setUsuario(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <>
            <HeaderComponent />
            <div className={`${styles.container} container_info`}>

                <div className={styles.first_column}>
                    <div className={styles.user_info}>
                        <User size={32} />
                        <div className={styles.user}>
                            {/* <p>{usuario?.nome_usuario}</p> */}
                            <p>Mausoleu</p>

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
                                    {/* <p>{usuario?.nome_usuario}</p> */}
                                    <p>Mausoleu</p>
                                    <PencilSimpleLine size={16} />
                                </div>

                                <div className={styles.flex}>
                                    {/* <p>{usuario?.email_usuario}</p> */}
                                    <p>mausoleu@gmail</p>
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
                                    <p>{usuario?.cpf_usuario}</p>
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