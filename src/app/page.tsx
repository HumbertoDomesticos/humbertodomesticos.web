'use client';

import Image from "next/image";
import styles from "./page.module.scss";
import { HeaderComponent } from "./components/header-component";
import { ProductCard, productList } from "./components/product-card-component";
import { Categories, categoriesList } from "./components/categories-component";
import { FooterComponent } from "./components/footer-component";
import { BestSelledComponent } from "./components/best-seller-component";
import { OurProductsComponent } from "./components/our-products-component";
import { OffersDayComponent } from "./components/offers-day-component";
import { StayInsideComponent } from "./components/stay-inside-component";
import { TesteAPI } from "@/services/routes/isConnected/page";
import type { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { ApiTeste, type Produto } from "@/services/api";

export default function Home() {
  const [data, setData] = useState<Produto[]>([]);

  useEffect(() => {
    TesteAPI().then((resp) => {
      console.log('Dados recebidos:', resp);
      setData(resp);
    }).catch((err) => {
      console.log(err);
    })
  }, []);


  return (
    <div className={styles.page}>

      <HeaderComponent />

      {/* <OffersDayComponent />

      <BestSelledComponent />

      <OurProductsComponent />

      <StayInsideComponent />

      <div className={styles.section}>
        <h1 className={styles.title}>Categorias</h1>
        <div className={styles.cardCategories}>
          {categoriesList.map((category) => (
            <Categories key={category.id} category={category.category} image={category.image} />
          ))}
        </div>
      </div> */}

      <ApiTeste produtos={data}/>
      <FooterComponent />


    </div>
  );
}
