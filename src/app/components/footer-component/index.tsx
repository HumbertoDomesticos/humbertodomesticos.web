import styles from "./styles.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function FooterComponent() {
  return (
    <div className={styles.all}>
      <div className={styles.content}>
        <div className={styles.footerColumn}>
          <h4>Empresa</h4>
          <ul>
            <li>Sobre nós</li>
            <li>Nossos serviços</li>
            <li>Política de privacidade</li>
            <li>Programa de afiliados</li>
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
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <p>&copy; HumbertoDomésticos - 2025</p>
      </div>
    </div>
  );
}
