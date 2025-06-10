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
        <Link href="/nossos-produtos"><p>Ver mais</p></Link>
      </div>
      <div className={styles.productCards}>
        {displayedProducts.map((product) => (
          <Link key={product.id_produto} href={`/produto/${product.id_produto}`} passHref>
            <ProductCard key={product.id_produto} name={product.descritivo_produto} price={product.preco} image={product.imagens} />
          </Link>
        ))}
      </div>
    </div>

  )
}