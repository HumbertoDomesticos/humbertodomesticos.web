import Link from 'next/link';
import styles from './styles.module.scss'
import { ProductCardPromo } from '../product-card-component-promo';
import type { ProdutoApi } from '@/services/routes/produtos/page';

export function OffersDayComponent({ produtos }: ProdutoApi) {
    return (
        <div className={`${styles.section} container_info`} id='ofertas-dia'>
            <h1 className={styles.title}>Ofertas do dia</h1>
            <div className={styles.productCards}>
                {produtos.map((product) => (
                    <Link key={product.id_prod} href={`/produto-promo/${product.id_prod}`} passHref>
                        <ProductCardPromo
                            name={product.nome_prod}
                            price={product.desconto_preco_produto}
                            oldPrice={product.preco_produto}
                            promo={product.desconto_prod}
                        />
                    </Link>
                ))}

            </div>
        </div >
    )
}