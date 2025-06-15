"use client";

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
  TextField,
} from "@mui/material";
import { HeaderComponentLogin } from "../components/header-component-login";
import styles from "./styles.module.scss";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { postUsuario, type Usuario } from "@/services/routes/usuarios/page";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("Pessoa física");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [nascimento, setNascimento] = useState<Dayjs | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    nome: "",
    cpf: "",
    nascimento: "",
    genero_usuario: "",
  });

  const handleSubmit = async () => {
    const usuarioPayload: Usuario = {
      nome_usuario: formData.nome,
      email_usuario: formData.email,
      cpf: formData.cpf,
      senha_usuario_temp: formData.senha,
      genero_usuario: formData.genero_usuario,
      // data_nasc_usuario: nascimento?.startOf('day').toISOString().split('T')[0] ?? '',
    };

    try {
      await postUsuario(usuarioPayload);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
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
              sx={{ "& .MuiTextField-root": { mb: 2 } }}
              noValidate
              autoComplete="off"
              className={styles.input}
            >
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <h1>Dados pessoais</h1>
              <TextField
                label="CPF"
                variant="outlined"
                value={formData.cpf}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  if (raw.length <= 11) {
                    const masked = raw
                      .replace(/^(\d{3})(\d)/, "$1.$2")
                      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                      .replace(/\.(\d{3})(\d)/, ".$1-$2");
                    setFormData({ ...formData, cpf: e.target.value });
                  }
                }}
                inputMode="numeric"
              />

              <TextField
                id="nome"
                label="Nome completo"
                variant="outlined"
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
              >
                <DatePicker
                  label="Data de nascimento"
                  value={nascimento}
                  onChange={(newValue) => {
                    setNascimento(newValue);
                    setFormData({
                      ...formData,
                      nascimento: newValue ? newValue.toISOString() : "",
                    });
                  }}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
              {/* <TextField id="nascimento" label="Data de nascimento" variant="outlined" /> */}

              <FormControl>
                <FormLabel id="genero-usuario-label">Gênero</FormLabel>
                <RadioGroup
                  aria-labelledby="genero-usuario-label"
                  name="genero-usuario"
                  value={formData.genero_usuario}
                  onChange={(e) =>
                    setFormData({ ...formData, genero_usuario: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="feminino"
                    control={<Radio />}
                    label="Feminino"
                  />
                  <FormControlLabel
                    value="masculino"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="outro"
                    control={<Radio />}
                    label="Outro"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl
                sx={{ width: "25ch", marginTop: "15px" }}
                variant="outlined"
              >
                <InputLabel htmlFor="senha">Senha</InputLabel>
                <OutlinedInput
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Esconder senha" : "Mostrar senha"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeClosed size={18} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  label="Senha"
                />
              </FormControl>
            </Box>

            {/* <Link href="/"> */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                marginTop: "15px",
                textTransform: "none",
              }}
              onClick={handleSubmit}
              // href="/"
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
