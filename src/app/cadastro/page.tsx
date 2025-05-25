'use client';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { HeaderComponentLogin } from "../components/header-component-login";
import styles from "./styles.module.scss";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { postUsuario, type Usuario } from "@/services/routes/usuarios/page";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from "dayjs";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("Pessoa física");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [nascimento, setNascimento] = useState<Dayjs | null>(null);


  // const [usuario, setUsuario] = useState<Usuario>();

  // useEffect(() => {
  //   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  //   postUsuario().then((resp: any) => {
  //     setUsuario(resp);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }, []);

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    cpf: '',
    nascimento: '',
    cnpj: '',
    razao: '',
    fantasia: '',
    inscricao: '',
    nomeResponsavel: '',
  });

 const handleSubmit = async () => {
  const usuarioPayload: Usuario = {
    nome_usuario: formData.nome,
    email_usuario: formData.email,
    cpf_usuario: formData.cpf,
    senha_usuario_temp: formData.senha,
    data_nasc_usuario: nascimento?.startOf('day').toISOString().split('T')[0] ?? ''
  };

  try {
    await postUsuario(usuarioPayload);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  }
};



  return (
    <div>
      <HeaderComponentLogin />

      <div className={`${styles.content} container_info`}>
        <h1>Quero criar uma conta</h1>

        <div className={styles.center}>
          <div className={styles.forms}>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { mb: 2 } }}
              noValidate
              autoComplete="off"
              className={styles.input}
            >
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <FormControl>
                <FormLabel id="tipo-conta-label">Tipo de conta</FormLabel>
                <RadioGroup
                  aria-labelledby="tipo-conta-label"
                  name="tipo-conta"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <FormControlLabel value="Pessoa física" control={<Radio />} label="Pessoa física" />
                  <FormControlLabel value="Pessoa jurídica" control={<Radio />} label="Pessoa jurídica" />
                </RadioGroup>
              </FormControl>

              {accountType === "Pessoa física" ? (
                <>
                  <h1>Dados pessoais</h1>
                  <TextField id="cpf" label="CPF" variant="outlined" onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} />
                  <TextField id="nome" label="Nome completo" variant="outlined" onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Data de nascimento"
                      value={nascimento}
                      onChange={(newValue) => {
                        setNascimento(newValue);
                        setFormData({ ...formData, nascimento: newValue ? newValue.toISOString() : '' });
                      }}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          fullWidth: true,
                        },
                      }}
                    />
                  </LocalizationProvider>

                  {/* <TextField id="nascimento" label="Data de nascimento" variant="outlined" /> */}
                </>
              ) : (
                <>
                  <h1>Dados da empresa</h1>
                  <TextField id="cnpj" label="CNPJ" variant="outlined" onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} />
                  <TextField id="razao" label="Razão social" variant="outlined" onChange={(e) => setFormData({ ...formData, razao: e.target.value })} />
                  <TextField id="fantasia" label="Nome fantasia" variant="outlined" onChange={(e) => setFormData({ ...formData, fantasia: e.target.value })} />
                  <TextField id="inscricao" label="Inscrição estadual" variant="outlined" onChange={(e) => setFormData({ ...formData, inscricao: e.target.value })} />

                  <h1>Dados pessoais do responsável</h1>
                  <TextField id="nome-responsavel" label="Nome completo" variant="outlined" onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })} />
                </>
              )}

              <FormControl sx={{ width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="senha">Senha</InputLabel>
                <OutlinedInput
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  label="Senha"
                />
              </FormControl>
            </Box>

            {/* <Link href="/"> */}
            <Button
              variant="contained"
              sx={{ backgroundColor: "var(--primary-color)", marginTop: "15px", textTransform: "none" }}
              onClick={handleSubmit}
              href="/"
            >
              Criar conta
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
