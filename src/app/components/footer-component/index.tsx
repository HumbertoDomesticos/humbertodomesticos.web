import styles from "./styles.module.scss"

export function FooterComponent(){
    return(
        <div>
            <div className={styles.content}>

            </div>
            <div className={styles.copy}>
                <p>&copy; HumbertoDomésticos - 2025</p>
            </div>
        </div>
    )
}