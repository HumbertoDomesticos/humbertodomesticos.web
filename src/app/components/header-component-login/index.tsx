'use client';

import Image from 'next/image'
import styles from './styles.module.scss'

export function HeaderComponentLogin() {
    return (
        <div className={styles.content}>
            {/* <div className={styles.firstRow}> */}
                <div className={`${styles.logo} container_info`}>
                    <Image src={"/images/logo.png"} alt={''} width={80} height={70}>
                    </Image>
                </div>
            
                <div className={`${styles.profile} container_info`}>
                  <span>Precisa de 
                    <br/>
                    ajuda?</span>
                </div>
            {/* </div> */}
       
        </div>
    )
}