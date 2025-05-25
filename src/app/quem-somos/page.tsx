"use client";

import { House, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import styles from "./styles.module.scss";
import MapPage, { DraggableMarker } from "../components/google-maps";

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

                    <MapPage />
                </div>
            {/* </div> */}

            <div className={`${styles.section} container_info`}>

                <h1>Nossa missão</h1>
                <p>Oferecer soluções inovadoras e acessíveis em eletrodomésticos, melhorando a qualidade de vida das pessoas por meio de produtos eficientes, duráveis e sustentáveis.</p>

                <h1>Nossa visão</h1>
                <p>Ser reconhecida como a marca líder em eletrodomésticos na América Latina, referência em tecnologia, design e compromisso com o meio ambiente até 2030.</p>

                <h1>Nossos valores</h1>
                <li>
                    Inovação constante: buscamos sempre novas formas de facilitar o dia a dia dos nossos clientes.
                </li>
                <li>
                    Qualidade e durabilidade: nossos produtos são feitos para durar.
                </li>
                <li>
                    Sustentabilidade: promovemos práticas e produtos que respeitam o meio ambiente.
                </li>
                <li>
                    Ética e transparência: agimos com responsabilidade em todas as relações.
                </li>
                <li>
                    Foco no cliente: ouvimos e entendemos quem nos escolhe todos os dias.
                </li>
                <li>
                    Trabalho em equipe: acreditamos que juntos vamos mais longe.
                </li>
            </div>

            <FooterComponent />

        </div>
    )
}