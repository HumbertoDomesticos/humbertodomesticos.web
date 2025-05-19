import { ProductCard } from '../product-card-component'
import styles from './styles.module.scss'
import Link from 'next/link'
import type { Produto, ProdutoApi } from '@/services/routes/produtos/page'

export function OurProductsComponent({ produtos }: ProdutoApi) {
    const displayedProducts = produtos.slice(0, 5);

  return (
    <div className={`${styles.section} container_info`}>
      <div className={styles.sectionOurProducts}>
        <h1 className={styles.title}>Nossos produtos</h1>
        <a href="/nossos-produtos"><p>Ver mais</p></a>
      </div>
      <div className={styles.productCards}>
        {displayedProducts.map((product) => (
          <Link key={product.id_prod} href={`/produto/${product.id_prod}`} passHref>
            <ProductCard key={product.id_prod} name={product.nome_prod} price={product.preco_produto} />
          </Link>
        ))}
      </div>
    </div>

  )
}