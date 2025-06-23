"use client";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
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


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Perfil() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [transfers, setTransfers] = useState([])
  const [transferPix, setPix] = useState([])

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

  const teste = async () => {
    const response = await fetch("/api/asaas/bank-transfer", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    setTransfers(data.data)

    console.log(data.data);
  }

  const pix = async () => {
    const response = await fetch("/api/asaas/pix", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    setPix(data.data)

    console.log(data.data);
  }

  return (
    <>
      <HeaderComponent />
      <Box
        sx={{ flexGrow: 1, display: 'flex' }}
        className={`${styles.container} container_info`}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Minha conta" {...a11yProps(0)} sx={{ textAlign: "start" }} />
          <Tab label="Transferências bancárias" {...a11yProps(1)} onClick={teste} />
          <Tab label="Transferências PIX" {...a11yProps(1)} onClick={pix} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <div className={styles.second_column}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <User size={22} weight="bold" />
              <h1>Meu perfil</h1>
            </div>
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
          {/* </div> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={styles.second_column}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Note size={22} />
              <h1>Minhas transferências</h1>
            </div>
            <span>Suas últimas transferências</span>

            <div className={styles.contentTransfers}>
              {transfers.map((e: any) => (
                <div key={e.id} className={styles.transferCard}>
                  <p><strong>ID:</strong> {e.id}</p>
                  <p><strong>Valor:</strong> R$ {e.value.toFixed(2)}</p>
                  <p><strong>Status:</strong> {e.status}</p>
                  <p><strong>Data:</strong> {e.dateCreated}</p>
                  <p><strong>Banco:</strong> {e.bankAccount.bank.name} ({e.bankAccount.bank.code})</p>
                </div>
              ))}

            </div>

          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={styles.second_column}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Note size={22} />
              <h1>Minhas transferências</h1>
            </div>
            <span>Suas últimas transferências</span>

            <div className={styles.contentTransfers}>
              {transferPix.map((e: any) => (
                <div key={e.id} className={styles.transferCard}>
                  <p><strong>ID:</strong> {e.id}</p>
                  <p><strong>Valor:</strong> R$ {e.value.toFixed(2)}</p>
                  <p><strong>Status:</strong> {e.status}</p>
                  <p><strong>Data:</strong> {e.dueDate}</p>
                  <p><strong>Pagamento:</strong> {e.billingType}</p>
                </div>
              ))}

            </div>

          </div>
        </TabPanel>
      </Box >
    </>
  );
}


