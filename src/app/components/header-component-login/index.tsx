'use client';

import Image from 'next/image'
import styles from './styles.module.scss'

export function HeaderComponentLogin() {
    return (
        <div className={styles.content}>
            {/* <div className={styles.firstRow}> */}
                <div>
                    <Image src={"/images/logo.png"} alt={''} width={80} height={70}>
                    </Image>
                </div>
            
                <div className={styles.profile}>
                  <span>Precisa de 
                    <br/>
                    ajuda?</span>
                </div>
            {/* </div> */}
       
        </div>
    )
}