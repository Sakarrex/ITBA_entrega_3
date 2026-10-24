import { Link } from 'react-router-dom';
import instagramIcon from '../../../assets/icons/instagram.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <section className="footer-section">
          <h3>Hermanos Jota - Casa Taller</h3>
          <address>
            <p>Av. San Juan 2847</p>
            <p>C1232AAB — Barrio de San Cristóbal</p>
            <p>Ciudad Autónoma de Buenos Aires</p>
            <p>Argentina</p>
          </address>
        </section>

        <section className="footer-section">
          <h4>Horarios:</h4>
          <p>Lunes a Viernes: 10:00 - 19:00</p>
          <p>Sábados: 10:00 - 14:00</p>
        </section>

        <section className="footer-section">
          <h4>Contacto Digital</h4>
          <address>
            <p>
              <strong>Sitio web:</strong>{' '}
              <a href="https://www.hermanosjota.com.ar">
                www.hermanosjota.com.ar
              </a>
            </p>
            <p>
              <strong>Email general:</strong>{' '}
              <a href="mailto:info@hermanosjota.com.ar">
                info@hermanosjota.com.ar
              </a>
            </p>
            <p>
              <strong>Ventas:</strong>{' '}
              <a href="mailto:ventas@hermanosjota.com.ar">
                ventas@hermanosjota.com.ar
              </a>
            </p>
            <p>
              <a
                className="footer-social-link"
                href="https://www.instagram.com/hermanosjota_ba/"
              >
                <img src={instagramIcon} alt="" />
                <strong>Instagram:</strong>
                @hermanosjota_ba
              </a>
            </p>
            <p>
              <a
                className="footer-social-link"
                href="https://wa.me/541145678900"
              >
                <img src={whatsappIcon} alt="" />
                <strong>WhatsApp:</strong>
                +54 11 4567-8900
              </a>
            </p>
          </address>
          <p>
            <Link className="footer-link" to="/contacto">
              Escribinos un mensaje
            </Link>
          </p>
        </section>
      </div>

      <div className="footer-copyright">
        <p>© 2026 Hermanos Jota. Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
