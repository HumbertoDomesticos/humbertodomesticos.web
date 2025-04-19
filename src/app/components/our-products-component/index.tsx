import { ProductCard, productList } from '../product-card-component'
import styles from './styles.module.scss'

export function OurProductsComponent() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionOurProducts}>
        <h1 className={styles.title}>Nossos produtos</h1>
        <a href="/nossos-produtos"><p>Ver mais</p></a>
      </div>
      <div className={styles.productCards}>
        {productList.map((product) => (
          <ProductCard key={product.id} name={product.name} price={product.price} oldPrice={product.oldPrice} />
        ))}
      </div>
    </div>

  )
}