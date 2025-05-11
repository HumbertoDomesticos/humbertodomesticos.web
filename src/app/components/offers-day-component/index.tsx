import { ProductCard, productList } from '../product-card-component'
import styles from './styles.module.scss'

export function OffersDayComponent() {
    return (
        <div className={styles.section} id='ofertas-dia'>
            <h1 className={styles.title}>Ofertas do dia</h1>
            <div className={styles.productCards}>
                {productList.map((product) => (
                    <ProductCard key={product.id} name={product.name} price={product.price} oldPrice={product.oldPrice} />
                ))}
            </div>
        </div>
    )
}