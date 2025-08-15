"use client";

import HeroBanner from "@/components/ui/banners/HeroBanner";
import HeroTitle from "@/components/ui/banners/HeroTitle";
import { motion } from "framer-motion";
import { useState } from "react";

export interface IContactPageProps {}

export interface IContactInfo {
  type: "phone" | "email" | "address" | "hours";
  label: string;
  value: string;
  icon: string;
}

export default function ContactPage(props: IContactPageProps) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [message, setMessage] = useState("");

  const contactInfo: IContactInfo[] = [
    {
      type: "phone",
      label: "Teléfono",
      value: "+34 123 456 789",
      icon: "📞",
    },
    {
      type: "email",
      label: "Email",
      value: "info@cgc-abogados.es",
      icon: "✉️",
    },
    {
      type: "address",
      label: "Dirección",
      value: "Calle Principal 123, 28001 Madrid",
      icon: "📍",
    },
    {
      type: "hours",
      label: "Horario",
      value: "Lunes a Viernes: 9:00 - 18:00",
      icon: "🕒",
    },
  ];

  const subjectOptions = [
    "Consulta General",
    "Derecho Penal",
    "Derecho Civil",
    "Derecho Laboral",
    "Derecho de Familia",
    "Derecho Inmobiliario",
    "Herencias y Sucesiones",
    "Derecho Bancario",
    "Extranjería e Inmigración",
    "Otro",
  ];

  const handleSendEmail = () => {
    const finalSubject = selectedSubject === "Otro" ? customSubject : selectedSubject;
    const emailSubject = finalSubject ? encodeURIComponent(finalSubject) : "";
    const emailBody = encodeURIComponent(message);
    
    let mailtoUrl = `mailto:info@cgc-abogados.com`;
    const params = [];
    
    if (emailSubject) {
      params.push(`subject=${emailSubject}`);
    }
    
    if (emailBody) {
      params.push(`body=${emailBody}`);
    }
    
    if (params.length > 0) {
      mailtoUrl += `?${params.join("&")}`;
    }
    
    window.location.href = mailtoUrl;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Banner */}
      <HeroBanner resourceUrl="/images/deal.webp" yShift={60}>
        <HeroTitle
          title="Contacta con Nosotros"
          subtitle="Estamos aquí para ayudarte. Tu consulta es gratuita y confidencial."
        />
      </HeroBanner>

      <section id="contact" className="px-6 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Contact Info Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-base-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  {info.label}
                </h3>
                <p className="text-base-content/80">{info.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-semibold mb-8">
                Envíanos un Mensaje
              </h2>
              
              <div className="space-y-6">
                {/* Subject Selection */}
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-medium">
                      Asunto (Opcional)
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Selecciona un asunto</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Subject Input */}
                {selectedSubject === "Otro" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="label">
                      <span className="label-text text-lg font-medium">
                        Especifica el asunto
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Escribe el asunto de tu consulta"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                    />
                  </motion.div>
                )}

                {/* Message Textarea */}
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-medium">
                      Mensaje
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="Describe tu situación legal. Incluye todos los detalles relevantes para que podamos asesorarte mejor."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendEmail}
                  className="btn btn-primary btn-lg w-full"
                >
                  📧 Enviar Consulta por Email
                </motion.button>

                {/* Privacy Notice */}
                <div className="bg-base-300 rounded-xl p-4 mt-6">
                  <p className="text-sm text-base-content/70">
                    <strong className="text-primary">🔒 Confidencialidad garantizada:</strong>{" "}
                    Toda la información que compartas con nosotros está protegida
                    por el secreto profesional de abogado-cliente.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-semibold mb-8">
                ¿Por qué Elegirnos?
              </h2>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Consulta Inicial Gratuita
                    </h3>
                    <p className="text-base-content/80">
                      Evaluamos tu caso sin costo alguno para ofrecerte la mejor
                      estrategia legal.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Experiencia Comprobada
                    </h3>
                    <p className="text-base-content/80">
                      Más de 15 años defendiendo los derechos de nuestros
                      clientes con resultados exitosos.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    💼
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Atención Personalizada
                    </h3>
                    <p className="text-base-content/80">
                      Cada caso es único. Ofrecemos soluciones adaptadas a tu
                      situación específica.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Respuesta Rápida
                    </h3>
                    <p className="text-base-content/80">
                      Contestamos tu consulta en menos de 24 horas laborables.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-error/10 border border-error/20 rounded-2xl p-6 mt-8"
              >
                <h3 className="text-xl font-semibold mb-3 text-error">
                  🚨 Urgencias Legales
                </h3>
                <p className="text-base-content/80 mb-4">
                  Si necesitas asistencia legal inmediata (detenciones,
                  urgencias familiares, etc.), llámanos directamente:
                </p>
                <a
                  href="tel:+34123456789"
                  className="btn btn-error btn-lg w-full"
                >
                  📞 Llamar Ahora: +34 123 456 789
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16 bg-primary/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-semibold mb-4">
              ¿Listo para Resolver tu Problema Legal?
            </h2>
            <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
              No dejes que las preocupaciones legales te quiten el sueño.
              Contacta con CGC y déjanos ayudarte a encontrar la mejor solución.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button
                onClick={handleSendEmail}
                className="btn btn-primary btn-lg"
              >
                💬 Iniciar Consulta Gratuita
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
