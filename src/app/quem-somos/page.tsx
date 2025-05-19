"use client";

import { House, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";
import styles from "./styles.module.scss";

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
            </div>

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