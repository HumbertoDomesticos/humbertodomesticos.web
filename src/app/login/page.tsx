'use client';

import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { HeaderComponentLogin } from "../components/header-component-login";
import styles from "./styles.module.scss"
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div >
            <HeaderComponentLogin />

            <div className={`${styles.content}  container_info`}>
                <h1>Faça login ou crie uma conta</h1>

                <div className={styles.center}>

                    <div className={styles.forms}>

                        <h2>Quero criar uma conta</h2>
                        <Box
                            component="form"
                            // sx={{ '& .MuiTextField-root': { width: "486.43px" } }}
                            noValidate
                            autoComplete="off"
                            className={styles.input}
                        >
                            <TextField id="outlined-basic" label="E-mail" variant="outlined" />

                        </Box>

                        <Link href="/cadastro"><Button variant="contained" href="/" sx={{ backgroundColor: "var(--primary-color)",  marginTop: "15px", textTransform: "none" }}>Continuar</Button></Link>
                    </div>

                    <div className={styles.forms}>
                        <h2>Já sou cliente</h2>

                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { mb: 2 } }}
                            noValidate
                            autoComplete="off"
                            className={styles.input}
                        >
                            <TextField id="outlined-basic" label="E-mail, CPF ou CNPJ" variant="outlined" />

                             <FormControl sx={{ width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'senha'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                            {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>

                        </Box>

                        <Link href="/"><Button variant="contained" href="/" sx={{ backgroundColor: "var(--primary-color)", marginTop: "15px", textTransform: "none" }}>Continuar</Button></Link>

                    </div>
                </div>
            </div>


        </div>
    )
}