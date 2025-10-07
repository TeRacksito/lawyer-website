"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-base-100">
      <section data-theme="dark" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1
                className="text-8xl lg:text-9xl font-bold text-primary select-none mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                404
              </motion.h1>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-base-content mb-6">
                Página No Encontrada
              </h2>
              <p className="text-lg lg:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
                Lo sentimos, la página que busca no está disponible actualmente.
                Esto puede deberse a que el contenido está en modo borrador, ha
                sido movido o la URL no es correcta.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-base-content mb-6">
                  Posibles Causas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-base-100 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-warning rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-base-content mb-1">
                        Contenido en Borrador
                      </h4>
                      <p className="text-sm text-base-content/70">
                        La página puede estar en modo borrador y no ser pública
                        aún
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-base-100 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-error rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-base-content mb-1">
                        URL Incorrecta
                      </h4>
                      <p className="text-sm text-base-content/70">
                        La dirección puede contener errores de escritura
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-base-100 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-info rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-base-content mb-1">
                        Contenido Movido
                      </h4>
                      <p className="text-sm text-base-content/70">
                        El contenido ha sido reorganizado o actualizado
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-base-content mb-6">
                  Qué Puede Hacer
                </h3>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-base-content mb-1">
                        Verificar la URL
                      </h4>
                      <p className="text-sm text-base-content/70">
                        Revise la dirección en la barra del navegador
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-base-content mb-1">
                        Regresar al Inicio
                      </h4>
                      <p className="text-sm text-base-content/70">
                        Volver a la página principal del sitio
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-base-content mb-1">
                        Contactar
                      </h4>
                      <p className="text-sm text-base-content/70">
                        Póngase en contacto con nuestro equipo
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-warning mb-4">
                  Contenido en Desarrollo
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  Si llegó aquí desde un enlace interno, es posible que el
                  contenido esté siendo actualizado o se encuentre en modo
                  borrador para revisión. Nuestro equipo trabaja constantemente
                  para mejorar y actualizar la información disponible.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.blockquote
              className="text-lg italic text-base-content/60 border-l-4 border-primary/30 pl-6 mb-4"
              whileHover={{ borderLeftColor: "rgb(var(--p) / 0.6)" }}
              transition={{ duration: 0.2 }}
            >
              "El derecho es la aplicación de la justicia a las circunstancias
              de los hombres."
            </motion.blockquote>
            <motion.p
              className="text-sm text-base-content/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              CGC Abogados • Consultas Gratuitas Cruz
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
