import { ProductCard } from "../product-card-component";
import styles from "./styles.module.scss";
import type { ProdutoApi } from "@/services/routes/produtos/page";
import Link from "next/link";

export function BestSelledComponent({ produtos }: ProdutoApi) {
  return (
    <div className={`${styles.section} container_info`} id="mais-vendidos">
      <h1 className={styles.title}>Mais Vendidos</h1>
      <div className={styles.productCards}>
        {produtos.map((product) => (
          <Link key={product.id_prod} href={`/produto/${product.id_prod}`} passHref>
            <ProductCard key={product.id_prod} name={product.nome_prod} price={product.preco_produto} />
          </Link>
        ))}
      </div>
    </div>
  )
}