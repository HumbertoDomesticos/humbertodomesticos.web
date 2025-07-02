"use client";

import { House, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import styles from "./styles.module.scss";
import MapPage, { DraggableMarker } from "../components/google-maps";
import Image from "next/image";

export default function Sobre() {
    return (

        <div>
            <HeaderComponent />

            <div className={`${styles.route} container_info`}>
                <span>
                    <Link href="/"><House size={20} /></Link>
                    <p>
                        <CaretRight size={14} />
                        Ofertas do dia
                    </p>
                </span>
            </div>

            <div className={`${styles.section} container_info`}>
                <h1>Humberto Domésticos</h1>
                <p>O Humberto Domésticos é um marketplace inovador e recém-chegado ao mercado, criado especialmente para facilitar a compra de eletrodomésticos de qualidade. Nosso objetivo é reunir as melhores marcas e produtos em um só lugar, oferecendo uma experiência simples, segura e prática para quem busca renovar sua casa com tecnologia e eficiência.
                    <br />
                    Aqui, você encontra desde itens básicos até as últimas novidades em eletrodomésticos, sempre com preços competitivos e condições especiais. Estamos comprometidos em conectar consumidores e vendedores de forma transparente, garantindo variedade, rapidez na entrega e atendimento dedicado.
                    <br />
                    Mais do que uma plataforma de vendas, o Humberto Domésticos quer ser um parceiro no dia a dia das pessoas, ajudando a transformar seus lares com soluções inteligentes, sustentáveis e acessíveis.

                </p>
                {/* <div className={styles.maps} */}
                <div>
                    <h1>Venha nos visitar</h1>
                    <p>
                        Nossa sede está localizada na Fatec Jahu, em Jaú/SP — um espaço de inovação e aprendizado que reflete nossos valores de tecnologia, sustentabilidade e compromisso com a comunidade.
                        Se estiver na região, será um prazer receber você para conhecer mais sobre nossos produtos, ideias e parcerias.
                    </p>
                </div>
                <div className={styles.imageDiv}>
                    <MapPage />
                    <Image
                        src="/images/2.png"
                        alt="Logo da Loja"
                        width={450}
                        height={450}
                        priority
                    />
                </div>

            </div>
            {/* </div> */}

            <div className={`${styles.section} container_info`}>
                <div>
                    <h1>Nossa missão</h1>
                    <p>Oferecer soluções inovadoras e acessíveis em eletrodomésticos, melhorando a qualidade de vida das pessoas por meio de produtos eficientes, duráveis e sustentáveis.</p>

                    <h1>Nossa visão</h1>
                    <p>Ser reconhecida como a marca líder em eletrodomésticos na América Latina, referência em tecnologia, design e compromisso com o meio ambiente até 2030.</p>
                    <div className={styles.imageDiv}>
                        <div>
                            <h1>Nossos valores</h1>
                            <li>
                                <b>Inovação constante:</b> buscamos sempre novas formas de facilitar o dia a dia dos nossos clientes.
                            </li>
                            <li>
                                <b>Qualidade e durabilidade:</b> nossos produtos são feitos para durar.
                            </li>
                            <li>
                                <b>Sustentabilidade:</b> promovemos práticas e produtos que respeitam o meio ambiente.
                            </li>
                            <li>
                                <b>Ética e transparência:</b> agimos com responsabilidade em todas as relações.
                            </li>
                            <li>
                                <b>Foco no cliente:</b> ouvimos e entendemos quem nos escolhe todos os dias.
                            </li>
                            <li>
                                <b>Trabalho em equipe:</b> acreditamos que juntos vamos mais longe.
                            </li>
                        </div>
                        <Image
                            src="/images/4.png"
                            alt="Logo da Loja"
                            width={300}
                            height={200}
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className={`${styles.section} container_info`}>
                <h1>Política de Privacidade</h1>
                <p>
                    Respeitamos a privacidade dos nossos usuários e nos comprometemos a proteger
                    todos os dados pessoais fornecidos em nossa plataforma. As informações
                    coletadas são utilizadas exclusivamente para processar pedidos, melhorar a
                    experiência de navegação e personalizar ofertas. Não compartilhamos dados
                    com terceiros sem o seu consentimento, exceto quando exigido por lei.
                </p>
                <p>
                    Utilizamos tecnologias seguras de criptografia e seguimos as boas práticas
                    de segurança da informação para garantir a confidencialidade dos dados.
                    Nossa política está em conformidade com a Lei Geral de Proteção de Dados
                    (LGPD).
                </p>

                <h1>Nosso compromisso com o meio ambiente</h1>
                <p>
                    Acreditamos que o e-commerce pode ser sustentável. Por isso, o Humberto
                    Domésticos adota práticas que minimizam o impacto ambiental das nossas
                    operações:
                </p>
                <ul>
                    <li>Priorizamos parceiros logísticos com rotas otimizadas e veículos eficientes.</li>
                    <li>Trabalhamos com fornecedores comprometidos com a produção sustentável.</li>
                    <li>Reduzimos o uso de papel com processos 100% digitais.</li>
                    <li>Incentivamos a reciclagem de embalagens e o descarte responsável de eletrônicos.</li>
                </ul>
                <p>
                    Nosso objetivo é crescer de forma consciente, respeitando o planeta e
                    promovendo escolhas mais sustentáveis para todos.
                </p>
            </div>

            <div className={`container_info`} style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>

                <Image
                    src="/images/logo.png"
                    alt="Logo da Loja"
                    width={200}
                    height={200}
                    priority
                />
            </div>
            <FooterComponent />

        </div>
    )
}