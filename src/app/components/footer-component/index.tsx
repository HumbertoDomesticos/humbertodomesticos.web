import Link from "next/link";
import styles from "./styles.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function FooterComponent() {
  return (
    <div className={styles.all}>
      <div className={styles.content}>
        <div className={styles.footerColumn}>
          <h4>Empresa</h4>
          <ul>
            <Link href={"/quem-somos"}><li>Sobre nós</li></Link>
            <Link href={"/quem-somos"}><li>Nossos serviços</li></Link>
            <Link href={"/quem-somos"}><li>Política de privacidade</li></Link>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Ajuda</h4>
          <ul>
            <li>FAQ</li>
            <li>Envio</li>
            <li>Devoluções</li>
            <li>Status do pedido</li>
            <li>Opções de pagamento</li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Loja online</h4>
          <ul>
            <li>Geladeiras</li>
            <li>Cafeteiras</li>
            <li>Máquinas de lavar</li>
            <li>Liquidificadores e muito mais</li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Siga-nos</h4>
          <div className={styles.socialIcons}>
            <Link href="#"><FaFacebookF /></Link>
            <Link href="#"><FaTwitter /></Link>
            <Link href="#"><FaInstagram /></Link>
            <Link href="#"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <p>&copy; HumbertoDomésticos - 2025</p>
      </div>
    </div>
  );
}
