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

      <FooterComponent />

    </div>
  );
}
