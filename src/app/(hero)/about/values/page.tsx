"use client";

import { motion } from "framer-motion";

export interface IValuesPageProps {}

export interface IValueCard {
  icon: string;
  title: string;
  description: string;
}

export default function ValuesPage(props: IValuesPageProps) {
  const values: IValueCard[] = [
    {
      icon: "⚖️",
      title: "Justicia",
      description: "Añade aquí tu visión sobre la justicia y cómo la aplicas en cada caso.",
    },
    {
      icon: "🤝",
      title: "Compromiso",
      description: "Describe el nivel de dedicación que ofreces a tus clientes y casos.",
    },
    {
      icon: "💡",
      title: "Innovación",
      description: "Explica cómo integras nuevas tecnologías y métodos en tu práctica legal.",
    },
    {
      icon: "🎯",
      title: "Excelencia",
      description: "Define qué significa la excelencia en tu trabajo y cómo la persigues.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Lo Que Nos Define
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-xl text-center mb-16 max-w-3xl mx-auto"
      >
        <span className="text-primary font-semibold">[Personaliza esta introducción]</span>
        {" "}Estos son los principios fundamentales que guían nuestro trabajo diario 
        y que nos ayudan a construir relaciones sólidas con nuestros clientes.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="card-body text-center">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="card-title justify-center text-xl mb-3">{value.title}</h3>
              <p className="text-base-content/80">{value.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mission Statement Section */}
      <motion.article
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-primary/10 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-semibold mb-6">Nuestra Misión</h3>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          <span className="text-primary font-semibold">[Escribe aquí tu misión]</span>
          {" "}Define cuál es el propósito fundamental de tu despacho, 
          qué impacto quieres generar en la vida de tus clientes y 
          cómo contribuyes a mejorar el acceso a la justicia.
        </p>
      </motion.article>
    </motion.div>
  );
}
