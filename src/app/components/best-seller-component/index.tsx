import { ProductCard, productList } from "../product-card-component";
import styles from "./styles.module.scss";

export function BestSelledComponent(){
    return(
        <div className={`${styles.section} container_info`} id="mais-vendidos">
        <h1 className={styles.title}>Mais Vendidos</h1>
        <div className={styles.productCards}>
          {productList.map((product) => (
            <ProductCard key={product.id} name={product.name} price={product.price} oldPrice={product.oldPrice} />
          ))}
        </div>
      </div>
    )
}