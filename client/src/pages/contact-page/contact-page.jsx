import { useState } from 'react';
import { Link } from 'react-router-dom';

import './contact-page.css';

const VALORES_INICIALES = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^\+?[\d\s()-]{8,20}$/;

function validarFormulario(valores) {
  const errores = {};
  const nombre = valores.name.trim();
  const email = valores.email.trim();
  const telefono = valores.phone.trim();
  const mensaje = valores.message.trim();

  if (!nombre) {
    errores.name = 'Ingresá tu nombre y apellido.';
  } else if (nombre.length < 3) {
    errores.name = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!email) {
    errores.email = 'Ingresá tu correo.';
  } else if (!REGEX_EMAIL.test(email)) {
    errores.email = 'Ingresá un correo válido, por ejemplo nombre@email.com.';
  }

  if (telefono && !REGEX_TELEFONO.test(telefono)) {
    errores.phone = 'Ingresá un teléfono válido, por ejemplo +54 11 2345-6789.';
  }

  if (!valores.subject) {
    errores.subject = 'Elegí un motivo de contacto.';
  }

  if (!mensaje) {
    errores.message = 'Escribí tu mensaje.';
  } else if (mensaje.length < 10) {
    errores.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errores;
}

export default function ContactPage() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setValores((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const erroresNuevos = validarFormulario(valores);
    setErrores(erroresNuevos);

    if (Object.keys(erroresNuevos).length > 0) {
      return;
    }

    setValores(VALORES_INICIALES);
    setIsSuccess(true);
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <div className={`contact-form-card ${isSuccess ? 'is-success' : ''}`}>
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            hidden={isSuccess}
          >
            <h2 className="contact-title">Formulario de contacto</h2>

            <div className="form-group">
              <label htmlFor="name">
                Nombre y Apellido{' '}
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre completo"
                value={valores.name}
                onChange={handleChange}
                aria-invalid={Boolean(errores.name)}
                aria-describedby="name-error"
                required
              />
              <p className="form-error" id="name-error" role="alert">
                {errores.name}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Correo{' '}
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@email.com"
                value={valores.email}
                onChange={handleChange}
                aria-invalid={Boolean(errores.email)}
                aria-describedby="email-error"
                required
              />
              <p className="form-error" id="email-error" role="alert">
                {errores.email}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+54 11 2345-6789"
                value={valores.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errores.phone)}
                aria-describedby="phone-error"
              />
              <p className="form-error" id="phone-error" role="alert">
                {errores.phone}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                Motivo de contacto{' '}
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </label>
              <select
                id="subject"
                name="subject"
                value={valores.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errores.subject)}
                aria-describedby="subject-error"
                required
              >
                <option value="">Elige Motivo</option>
                <option value="consulta">Consulta General</option>
                <option value="pedido">Realizar un Pedido</option>
                <option value="personalizado">Mueble Personalizado</option>
                <option value="otro">Otro</option>
              </select>
              <p className="form-error" id="subject-error" role="alert">
                {errores.subject}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Mensaje{' '}
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Escribí tu mensaje aquí..."
                value={valores.message}
                onChange={handleChange}
                aria-invalid={Boolean(errores.message)}
                aria-describedby="message-error"
                required
              ></textarea>
              <p className="form-error" id="message-error" role="alert">
                {errores.message}
              </p>
            </div>

            <button type="submit" className="contact-button">
              ENVIAR
            </button>

            <p className="form-note" id="form-note">
              Por favor rellenar campos obligatorios
            </p>
          </form>

          <div className="contact-success" hidden={!isSuccess}>
            <img
              className="contact-success-image"
              src="/assets/icons/check_circle.svg"
              alt="Imagen de mensaje enviado con éxito"
              width="208"
              height="208"
            />
            <p className="contact-success-message">
              Mensaje enviado con éxito!
              <br />
              Nuestro equipo se comunicará dentro de breve
              <br />
              <strong>Muchas Gracias!</strong>
            </p>
            <Link className="contact-success-button" to="/">
              VOLVER A INICIO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
