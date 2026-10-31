import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './contact-page.css';

const contactoSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Ingresá tu nombre y apellido.')
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: yup
    .string()
    .trim()
    .required('Ingresá tu correo.')
    .email('Ingresá un correo válido, por ejemplo nombre@email.com.'),
  phone: yup
    .string()
    .trim()
    .matches(/^\+?[\d\s()-]{8,20}$/, {
      message: 'Ingresá un teléfono válido, por ejemplo +54 11 2345-6789.',
      excludeEmptyString: true,
    }),
  subject: yup.string().required('Elegí un motivo de contacto.'),
  message: yup
    .string()
    .trim()
    .required('Escribí tu mensaje.')
    .min(10, 'El mensaje debe tener al menos 10 caracteres.'),
});

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: errores },
  } = useForm({
    resolver: yupResolver(contactoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  function enviarFormulario() {
    reset();
    setIsSuccess(true);
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <div className={`contact-form-card ${isSuccess ? 'is-success' : ''}`}>
          <form
            className="contact-form"
            onSubmit={handleSubmit(enviarFormulario)}
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
                {...register('name')}
                placeholder="Nombre completo"

                aria-invalid={Boolean(errores.name)}
                aria-describedby="name-error"
                required
              />
              <p className="form-error" id="name-error" role="alert">
                {errores.name?.message}
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
                {...register('email')}
                placeholder="ejemplo@email.com"

                aria-invalid={Boolean(errores.email)}
                aria-describedby="email-error"
                required
              />
              <p className="form-error" id="email-error" role="alert">
                {errores.email?.message}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                placeholder="+54 11 2345-6789"

                aria-invalid={Boolean(errores.phone)}
                aria-describedby="phone-error"
              />
              <p className="form-error" id="phone-error" role="alert">
                {errores.phone?.message}
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
                {...register('subject')}

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
                {errores.subject?.message}
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
                {...register('message')}
                rows="6"
                placeholder="Escribí tu mensaje aquí..."

                aria-invalid={Boolean(errores.message)}
                aria-describedby="message-error"
                required
              ></textarea>
              <p className="form-error" id="message-error" role="alert">
                {errores.message?.message}
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
