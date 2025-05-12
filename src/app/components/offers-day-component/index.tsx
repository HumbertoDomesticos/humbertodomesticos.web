import Link from 'next/link';
import { ProductCard, productList } from '../product-card-component'
import styles from './styles.module.scss'
import { useRouter } from 'next/router';

export function OffersDayComponent() {

    return (
        <div className={`${styles.section} container_info`} id='ofertas-dia'>
            <h1 className={styles.title}>Ofertas do dia</h1>
            <Link href="/produto">

                <div className={styles.productCards}>
                    {productList.map((product) => (
                        <ProductCard key={product.id} name={product.name} price={product.price} oldPrice={product.oldPrice} />
                    ))}
                </div>
            </Link>
        </div >
    )
}