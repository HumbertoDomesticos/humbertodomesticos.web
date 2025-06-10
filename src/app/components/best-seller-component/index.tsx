import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { ProductCardPromo } from '../product-card-component-promo';
import type { ProdutoApi } from '@/services/routes/produtos/page';
import { ProductCard } from '../product-card-component';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export function BestSelledComponent({ produtos }: ProdutoApi) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const itemsPerPage = 5;

  const nextSlide = () => {
    setTransitionDirection('right');
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= produtos.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setTransitionDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, produtos.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  const visibleProducts = produtos.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className={`${styles.section} container_info`} id='ofertas-dia'>
      <h1 className={styles.title}>Mais vendidos</h1>
      <div className={styles.carouselContainer}>

        <div className={`${styles.productCards} ${styles[transitionDirection]}`}>
          {visibleProducts.map((product) => (
            <Link key={product.id_produto} href={`/produto/${product.id_produto}`} passHref>
              <ProductCard key={product.id_produto} name={product.descritivo_produto} price={product.preco} image={product.imagens} />
            </Link>
          ))}
        </div>

        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={nextSlide}
          className={styles.carouselButton}
          aria-label="Próximo"
        >
          <CaretRight size={28} />
        </button>
      </div>

      {/* Indicadores */}
      <div className={styles.indicators}>
        {Array.from({ length: Math.ceil(produtos.length / itemsPerPage) }).map((_, i) => (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className={`${styles.indicator} ${currentIndex === i * itemsPerPage ? styles.active : ''}`}
            onClick={() => setCurrentIndex(i * itemsPerPage)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}