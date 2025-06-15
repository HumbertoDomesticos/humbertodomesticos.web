// "use client";

// import { HeaderComponent } from "@/app/components/header-component";
// import styles from "./style.module.scss";
// import { CaretRight, House } from "@phosphor-icons/react";
// import Link from "next/link";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";

// import { useEffect, useState } from "react";
// import { Button } from "@mui/material";
// import ProdutoParaComprar from "@/app/components/buying-product-component/page";
// // import { useAuth } from "@/app/context/AuthContext";
// import { useProduto } from "@/app/context/ProdutosContext";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";
// import {
//   getPedidoAberto,
//   postFecharPedido,
// } from "@/services/routes/pedidos/page";
// import BasicModal from "@/app/components/add-adress/page";
// import { Produto } from "@/services/routes/produtos/page";
// import { loadStripe } from "@stripe/stripe-js";
// import PixPayment from "@/app/components/pix-payment";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// // const stripePromise = loadStripe(
// //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// // );

// export default function FinalizarPedido() {
//   const [value, setValue] = useState(0);

//   const [addAddress, setAddAddress] = useState(false);
//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   const { carrinho, removerDoCarrinho, limparCarrinho, quantidadeItens } =
//     useProduto();

//   const { isAuthenticated, user } = useAuth();
//   const [showPix, setShowpix] = useState(false);
//   const handleShowPix = () => {
//     setShowpix(true);
//   };

//   //   const [pedidoFinal, setPedidoFinal] = useState<Produto[]>([])

//   const [pedido, setPedido] = useState<Produto[]>([]);

//   useEffect(() => {
//     if (!user?.id_usuario) {
//       return;
//     }

//     const fetchPedidoAberto = async () => {
//       try {
//         const response = await getPedidoAberto(user?.id_usuario!);
//         // Extract products from the order response
//         const produtos = response.data.produtos_em_pedido.map((item) => ({
//           ...item.produto,
//           quantidade: item.quant_produto_em_pedido,
//         }));

//         setPedido(produtos);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//       }
//     };

//     fetchPedidoAberto();
//   }, [user?.id_usuario, carrinho]);

//   const calcularSubtotal = () => {
//     return pedido.reduce((total, produto) => {
//       const preco =
//         Number(
//           produto.preco_descontado
//             ?.toString()
//             .replace("R$", "")
//             .replace(",", ".")
//             .trim()
//         ) || 0;
//       const quantidade = produto.quantidade || 1;
//       return total + preco * quantidade;
//     }, 0);
//   };

//   let quantidade = 0;

//   for (let i = 0; i < pedido.map((e) => e.quantidade).length; i++) {
//     quantidade += i;
//   }

//   pedido.map((e) => e.quantidade);

//   const subtotal = calcularSubtotal();

//   //  const handleCheckout = async () => {
//   //     const stripe = await stripePromise;
//   //     const response = await fetch('/api/checkout-sessions/create', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         cartItems: pedido,
//   //         returnUrl: window.location.origin,
//   //       }),
//   //     });
//   //     const { sessionId } = await response.json();
//   //     await stripe.redirectToCheckout({ sessionId });
//   //   };

//   return (
//     <div>
//       <HeaderComponent />

//       <div className={`${styles.route} container_info`}>
//         <span>
//           <Link href="/">
//             <House size={20} />
//           </Link>
//           <Link href="/carrinho-de-compras">
//             <p>
//               <CaretRight size={14} />
//               Meu carrinho
//             </p>
//           </Link>
//           <p>
//             <CaretRight size={14} />
//             Finalizar pedido
//           </p>
//         </span>
//       </div>

//       <div className={`${styles.content} container_info`}>
//         <div className={styles.section}>
//           <h1>Endereço de entrega</h1>
//           {user?.enderecos?.length! <= 0 ? (
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "var(--primary-color)",
//                 boxShadow: "none",
//                 textTransform: "none",
//               }}
//               onClick={() => setAddAddress(true)}
//             >
//               Adicionar endereço
//             </Button>
//           ) : (
//             <span>{user?.enderecos?.map((end) => end.rua_endereco)}</span>
//           )}
//         </div>

//         {addAddress && <BasicModal />}

//         <div className={styles.section}>
//           <h1>Produtos pedidos</h1>
//           <ProdutoParaComprar isBuying={true} />
//         </div>

//         <div className={styles.section}>
//           <h1>Método de pagamento</h1>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="basic tabs example"
//             >
//               <Tab label="Pix" {...a11yProps(0)} />
//               <Tab label="Transferência bancária" {...a11yProps(1)} />
//             </Tabs>
//           </Box>
//           <CustomTabPanel value={value} index={0}>
//             <form action="/api/checkout_sessions" method="POST">
//               <section>
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   role="link"
//                   sx={{
//                     backgroundColor: "var(--primary-color)",
//                     boxShadow: "none",
//                     textTransform: "none",
//                   }}
//                 >
//                   Pix
//                 </Button>
//               </section>
//             </form>
//           </CustomTabPanel>
//           {showPix && <PixPayment />}
//           <CustomTabPanel value={value} index={1}>
//             {/* <form action="/api/checkout_sessions" method="POST">
//               <section> */}
//             <Button
//               variant="contained"
//               type="submit"
//               role="link"
//               // onClick={handleCheckout}
//               sx={{
//                 backgroundColor: "var(--primary-color)",
//                 boxShadow: "none",
//                 textTransform: "none",
//               }}
//             >
//               Transferência bancária
//             </Button>
//             {/* </section>
//             </form> */}
//           </CustomTabPanel>

//           <div>
//             <p>Produto ({pedido.map((p) => p.quantidade)})</p>
//             <p>{pedido.map((p) => p.preco)}</p>
//             <p>Frete</p>
//             <p>Grátis</p>
//           </div>
//           <div>
//             <span>Total</span>
//             <span>R${subtotal}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';

export default function PixPayment() {
  const [loading, setLoading] = useState(false);
  const [pixPayload, setPixPayload] = useState('');
  const [pixUrl, setPixUrl] = useState('');

  const gerarPix = async () => {
    setLoading(true);
    const res = await fetch('/api/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Fulano da Silva',
        email: 'fulano@email.com',
        valor: 49.9,
      }),
    });

    const data = await res.json();
    setPixPayload(data.pixPayload);
    setPixUrl(data.pixUrl);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Pagamento via PIX</h2>
      <button
        onClick={gerarPix}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Gerando...' : 'Gerar cobrança PIX'}
      </button>

      {pixPayload && (
        <div className="mt-4 space-y-2">
          <p><strong>QR Code:</strong></p>
          <a href={pixUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
            Ver QR Code
          </a>
          <textarea value={pixPayload} readOnly className="w-full p-2 border rounded text-sm" />
        </div>
      )}
    </div>
  );
}
