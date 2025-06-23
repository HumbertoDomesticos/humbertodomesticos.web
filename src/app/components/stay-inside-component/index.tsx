import Image from 'next/image'
import styles from './styles.module.scss'

export function StayInsideComponent(){
    return (
        <div className={`${styles.section} container_info`} id='fique-dentro'>
        <h1 className={styles.title}>Fique por dentro</h1>
        <div className={styles.banners}>
          <div>
            <Image src={"/banners/banner1.png"} alt={""} width={620} height={420} />
          </div>
          <div>
            <Image src={"/banners/banner2.png"} alt={""} width={620} height={420} />
          </div>
        </div>
      </div>

    )
}