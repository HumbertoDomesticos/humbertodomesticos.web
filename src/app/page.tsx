'use client';

import Image from "next/image";
import styles from "./page.module.scss";
import { HeaderComponent } from "./components/header-component";
import { ProductCard } from "./components/product-card-component";
import { Categories, categoriesList } from "./components/categories-component";
import { FooterComponent } from "./components/footer-component";
import { BestSelledComponent } from "./components/best-seller-component";
import { OurProductsComponent } from "./components/our-products-component";
import { OffersDayComponent } from "./components/offers-day-component";
import { StayInsideComponent } from "./components/stay-inside-component";
import type { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { type Produto, getProduto } from "@/services/routes/produtos/page";

export default function Home() {
  const [data, setData] = useState<Produto[]>([]);

  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    getProduto().then((resp: any) => {
      setData(resp);
    }).catch((err) => {
      console.log(err);
    })
  }, []);


  return (
    <div className={styles.page}>

      <HeaderComponent />

      <div className={`${styles.section} container_info`}>
        <h1>Humberto Domésticos</h1>
      </div>



      <OffersDayComponent produtos={data} />

      <BestSelledComponent produtos={data} />

      <OurProductsComponent produtos={data} />

      <StayInsideComponent />

      {/* <div className={`${styles.section} container_info`}>
        <h1 className={styles.title}>Categorias</h1>
        <div className={styles.cardCategories}>
          {categoriesList.map((category) => (
            <Categories key={category.id} category={category.category} image={category.image} />
          ))}
        </div>
      </div> */}

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
  );
}
