"use client";

import { motion } from "framer-motion";

export interface IAboutPageProps {}

export interface ITimelineItem {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function AboutPage(props: IAboutPageProps) {
  const timelineItems: ITimelineItem[] = [
    {
      year: "Fundación",
      title: "Los inicios de nuestra historia",
      description: "Describe aquí cómo comenzó el despacho, qué motivó su creación y cuáles fueron los primeros pasos.",
      highlight: true,
    },
    {
      year: "Crecimiento",
      title: "Expansión de servicios",
      description: "Cuenta sobre la evolución del despacho, nuevas áreas de práctica y casos destacados.",
    },
    {
      year: "Reconocimiento",
      title: "Consolidación en el sector",
      description: "Menciona los logros, reconocimientos y la reputación ganada a lo largo de los años.",
    },
    {
      year: "Actualidad",
      title: "Compromiso con el futuro",
      description: "Habla sobre la visión actual, innovación y hacia dónde se dirige el despacho.",
      highlight: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Introduction */}
      <article className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Nuestra Trayectoria
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-lg max-w-4xl mx-auto text-center"
        >
          <p className="text-xl leading-relaxed mb-6">
            <span className="text-primary font-semibold">[Personaliza este párrafo]</span> 
            {" "}Aquí puedes contar la historia personal que llevó a la creación del despacho. 
            Menciona qué te inspiró a ser abogado, cuáles fueron tus primeros casos 
            y qué te diferencia de otros profesionales del sector.
          </p>
          <p className="text-lg text-base-content/80">
            Comparte anécdotas significativas, momentos decisivos en tu carrera 
            y cómo has evolucionado para ofrecer el mejor servicio a tus clientes.
          </p>
        </motion.div>
      </article>

      {/* Timeline */}
      <article>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-semibold text-center mb-12"
        >
          Hitos de Nuestro Camino
        </motion.h3>
        
        {/* Mobile-first responsive timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - responsive positioning */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 w-1 bg-primary h-full"></div>
          
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`relative mb-12 md:flex md:items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Mobile layout: single column with left-aligned timeline */}
              <div className={`
                pl-12 md:pl-0 
                md:w-1/2 
                ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}
              `}>
                <div className={`card bg-base-200 shadow-lg ${item.highlight ? "border-2 border-primary" : ""}`}>
                  <div className="card-body">
                    <div className="badge badge-primary mb-2">{item.year}</div>
                    <h4 className="card-title text-lg">{item.title}</h4>
                    <p className="text-base-content/80">{item.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline dot - responsive positioning */}
              <div className={`
                absolute left-2.5 top-6 md:top-1/2 md:left-1/2 
                md:transform md:-translate-x-1/2 md:-translate-y-1/2
                w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary
                border-2 md:border-4 border-base-100
              `}></div>
            </motion.div>
          ))}
        </div>
      </article>
    </motion.div>
  );
}
