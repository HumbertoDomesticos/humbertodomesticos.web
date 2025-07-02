"use client";

import { HeaderComponent } from "@/app/components/header-component";
import styles from "./style.module.scss";
import { CaretRight, House } from "@phosphor-icons/react";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ProdutoParaComprar from "@/app/components/buying-product-component/page";
import { useProduto } from "@/app/context/ProdutosContext";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  getPedidoAberto,
  postFecharPedido,
} from "@/services/routes/pedidos/page";
import { Produto } from "@/services/routes/produtos/page";
import { ShowPix } from "@/app/components/show-pix";
import { ShowBankTransfer } from "@/app/components/show-bank-transfer";
import { AddressInputs } from "@/app/components/add-address/page";
import { FooterComponent } from "@/app/components/footer-component";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

export default function FinalizarPedido() {
  const [value, setValue] = useState(0);

  const [addAddress, setAddAddress] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { carrinho } =
    useProduto();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [pixPayload, setPixPayload] = useState("");
  const [pixUrl, setPixUrl] = useState("");
  const [pixModal, setPixModal] = useState(false)
  const [bankTransferModal, setBankTransferModal] = useState(false)

  const [pedido, setPedido] = useState<Produto[]>([]);
  const [showPagamento, setShowPagamento] = useState(false);

  const handleOpenSetAddress = () => setAddAddress(true);
  const handleCloseSetAddress = () => setAddAddress(false);

  const handleOpenSetBankTransferModal = () => setBankTransferModal(true);
  const handleCloseSetBankTransferModal = () => setBankTransferModal(false);

  const handleClosePix = () => {
    setPixModal(false);
    redirect('/')
  }

  useEffect(() => {
    if (!user?.id_usuario) {
      return;
    }

    const fetchPedidoAberto = async () => {
      try {
        const response = await getPedidoAberto(user?.id_usuario!);
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

  const calcularSubtotal = () => {
    return pedido.reduce((total, produto) => {
      const preco =
        Number(
          produto.preco_descontado
            ?.toString()
            .replace("R$", "")
            .replace(",", ".")
            .trim()
        ) || 0;

      const quantidade = produto.quantidade || 1;
      return total + preco * quantidade;
    }, 0);
  };

  let quantidade = pedido.map((e) => e.quantidade);

  const subtotal = calcularSubtotal();

  const formatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const gerarPix = async () => {
    try {
      const response = await fetch("/api/asaas/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.nome_usuario,
          email: user?.email_usuario,
          cpfCnpj: user?.cpf,
          // value: 2000,
          value: subtotal,
        }),
      });

      console.log("Resposta do fetch:", response.status, response.statusText);

      const data = await response.json();

      console.log(data.qrCode);

      if (data.qrCode) {
        setPixPayload(data.qrCode.pixCopyPaste);
        setPixUrl(data.qrCode.pixQrCode);
      } else {
        console.error("Erro ao gerar QR Code PIX", data);
      }

      setPixModal(true);

    } catch (error) {
      console.error("Erro ao chamar API do PIX:", error);
    }
  };

  const handleFecharPedido = async () => {
    await postFecharPedido(user?.id_usuario!, "pix");
  };

  const handleShowPagamente = () => {
    setShowPagamento(true)
  }

  const handleClickPix = () => {
    gerarPix();
    handleFecharPedido();
  }
  const handleBankTransfer = () => {
    handleOpenSetBankTransferModal();
    handleFecharPedido();
  }
  return (
    <div>
      <HeaderComponent />
      <div className={`${styles.route} container_info`}>
        <span>
          <Link href="/">
            <House size={20} />
          </Link>
          <Link href="/carrinho-de-compras">
            <p>
              <CaretRight size={14} />
              Meu carrinho
            </p>
          </Link>
          <p>
            <CaretRight size={14} />
            Finalizar pedido
          </p>
        </span>
      </div>


      <div className={`${styles.content} container_info`}>
        {<div className={styles.section}>
          <h1>Endereço de entrega</h1>
          {user?.enderecos?.length! <= 0 ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                boxShadow: "none",
                textTransform: "none",
                marginTop: "25px"
              }}
              onClick={handleOpenSetAddress}
            >
              Adicionar endereço
            </Button>
          ) : (
            <span>{user?.enderecos?.map((end) => end.rua_endereco)}</span>
          )}
        </div>}

        {addAddress && <AddressInputs handleClose={handleCloseSetAddress} />}

        <div className={styles.section}>
          <h1>Produtos pedidos</h1>
          <ProdutoParaComprar isBuying={true} />
          <div className={styles.resumoPedido}>
            <div className={styles.linhaResumo}>
              <span className={styles.label}>Produto ({pedido.reduce((acc, p) => acc + p.quantidade, 0)})</span>
              <span className={styles.valor}>R$ {formatter.format(subtotal)}</span>
            </div>
            <div className={styles.linhaResumo}>
              <span className={styles.label}>Frete</span>
              <span className={styles.valor}>Grátis</span>
            </div>
            <div className={`${styles.linhaResumo} ${styles.total}`}>
              <span className={styles.label}>Total</span>
              <span className={styles.valor}>R$ {formatter.format(subtotal)}</span>
            </div>
          </div>

          <div>
            <Button
              variant="contained"
              type="submit"
              role="link"
              onClick={handleShowPagamente}
              sx={{
                backgroundColor: "var(--primary-color)",
                boxShadow: "none",
                textTransform: "none",
                marginTop: "25px"
              }}
            >
              Fazer pedido
            </Button>
          </div>
        </div>

        {showPagamento && (
          <div className={styles.section}>
            <h1>Método de pagamento</h1>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Pix" {...a11yProps(0)} />
                <Tab label="Transferência bancária" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <section>
                <Button
                  variant="contained"
                  type="submit"
                  role="link"
                  onClick={handleClickPix}
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    boxShadow: "none",
                    textTransform: "none",
                  }}
                >
                  Pix
                </Button>
              </section>

              {pixModal && pixPayload && pixUrl && (
                <ShowPix handleClose={handleClosePix} pixUrl={pixUrl} pixPayload={pixPayload} />
              )}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <Button
                variant="contained"
                type="submit"
                role="link"
                sx={{
                  backgroundColor: "var(--primary-color)",
                  boxShadow: "none",
                  textTransform: "none",
                }}
                onClick={handleBankTransfer}
              >
                Transferência bancária
              </Button>

              {bankTransferModal && <ShowBankTransfer handleClose={handleOpenSetBankTransferModal} subtotal={subtotal} />}
            </CustomTabPanel>
          </div>
        )}
      </div>

      <FooterComponent />
    </div>
  );
}
