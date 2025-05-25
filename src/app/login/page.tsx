'use client';

import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { HeaderComponentLogin } from "../components/header-component-login";
import styles from "./styles.module.scss";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { type Usuario, getUsuarioPorEmail } from "@/services/routes/usuarios/page";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, senha);
            router.push('/');
        } catch (err) {
            setError('Credenciais inválidas. Por favor, tente novamente.');
            console.error('Login error:', err);
        }
    };

    return (
        <div>
            <HeaderComponentLogin />

            <div className={`${styles.content} container_info`}>
                <h1>Faça login ou crie uma conta</h1>

                <div className={styles.center}>
                    <div className={styles.forms}>
                        <h2>Quero criar uma conta</h2>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className={styles.input}
                        >
                            <TextField
                                id="email-cadastro"
                                label="E-mail"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                        </Box>

                        <Link href="/cadastro" passHref legacyBehavior>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "var(--primary-color)",
                                    marginTop: "15px",
                                    textTransform: "none",
                                    width: '100%'
                                }}
                            >
                                Continuar
                            </Button>
                        </Link>
                    </div>

                    <div className={styles.forms}>
                        <h2>Já sou cliente</h2>

                        {error && (
                            <div style={{ color: 'red', marginBottom: '16px' }}>
                                {error}
                            </div>
                        )}

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { mb: 2 },
                                width: '100%'
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                id="login-email"
                                label="E-mail"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                            />

                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'Esconder senha' : 'Mostrar senha'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha"
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "var(--primary-color)",
                                    marginTop: "15px",
                                    textTransform: "none",
                                    padding: '12px'
                                }}
                            >
                                Continuar
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}