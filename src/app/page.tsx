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
import { ArrowCircleDown } from "@phosphor-icons/react";

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

      <div className={styles.content}>
        <div className={`${styles.introdution} container_info`} style={{ marginTop: "40px" }}>
          <div>
            <Image src={"/banners/banner1.jpg"} alt={""} width={640} height={340} style={{ borderRadius: "8px" }} />
          </div>
          <div>
            <span>Humberto Domésticos</span>
            <p>
              ⚡ Chegou o <strong>Humberto Domésticos</strong>! O marketplace que vai revolucionar sua forma de comprar eletrodomésticos.
              <br />
               Não compre antes de conhecer o <strong>futuro da sua casa!</strong>
            </p>

            <div style={{ display: "flex" }}>
              <span className={styles.spanTeste}>Conheça mais sobre nossos produtos abaixo.   <ArrowCircleDown size={26} color={"var(--primary-color)"} /></span>          </div>
          </div>
        </div>

        <div className={`${styles.section} container_info`}>
          {/* <h1 className={styles.title}>Categorias</h1> */}
          <div className={styles.cardCategories}>
            {categoriesList.map((category) => (
              <Categories key={category.id} category={category.category} image={category.image} />
            ))}
          </div>
        </div>

        <OffersDayComponent produtos={data} />

        {/* <BestSelledComponent produtos={data} /> */}

        <OurProductsComponent produtos={data} />

        <StayInsideComponent />
      </div>



      <FooterComponent />

    </div>
  );
}
