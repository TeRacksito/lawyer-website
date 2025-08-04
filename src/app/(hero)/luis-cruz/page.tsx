"use client";

import HeroBanner from "@/components/ui/banners/HeroBanner";
import HeroTitle from "@/components/ui/banners/HeroTitle";
import SimpleCard from "@/components/ui/cards/SimpleCard";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ILuisCruzPageProps {}

export default function LuisCruzPage(props: ILuisCruzPageProps) {
  const milestones = [
    {
      year: "2009",
      title: "Graduación en Derecho",
      description: "Universidad Complutense de Madrid con mención de honor",
    },
    {
      year: "2011",
      title: "Primer Caso Ganado",
      description: "Defensa exitosa en un complejo caso de derecho laboral",
    },
    {
      year: "2015",
      title: "Especialización",
      description: "Máster en Derecho Penal y Proceso Penal",
    },
    {
      year: "2018",
      title: "Despacho Independiente",
      description: "Fundación de su propio bufete enfocado en atención personalizada",
    },
    {
      year: "2024",
      title: "15 Años de Experiencia",
      description: "Más de 500 casos resueltos con éxito",
    },
  ];

  const values = [
    {
      icon: "⚖️",
      title: "Justicia Humana",
      description: "Cada caso es una historia personal que merece ser escuchada con respeto y dedicación.",
    },
    {
      icon: "🤝",
      title: "Cercanía",
      description: "Trato directo y personal. No somos un gran bufete, somos tu abogado de confianza.",
    },
    {
      icon: "🎯",
      title: "Compromiso",
      description: "Dedicación absoluta a cada caso, sin importar su complejidad o duración.",
    },
    {
      icon: "💡",
      title: "Innovación",
      description: "Combinamos la tradición jurídica con tecnologías modernas para mejores resultados.",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner resourceUrl="/images/cross.webp">
        <HeroTitle
          title="Luis Cruz"
          subtitle="Más que un abogado, un defensor de historias humanas"
        />
      </HeroBanner>

      {/* Personal Story Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <div>
              <h2 className="text-3xl font-semibold mb-6">Una vocación que nació de la necesidad</h2>
              <p className="text-lg mb-6">
                Mi camino en el derecho comenzó cuando era adolescente. Vi a mi familia luchar 
                contra una injusticia que parecía imposible de resolver. El abogado que nos representó 
                no solo ganó el caso, sino que nos devolvió la esperanza.
              </p>
              <p className="text-lg mb-6">
                Ese día decidí que quería ser esa persona para otros. No solo un técnico del derecho, 
                sino alguien que entiende que detrás de cada expediente hay una vida, una familia, 
                una historia que merece ser defendida.
              </p>
              <p className="text-lg">
                Hoy, después de 15 años en los tribunales, sigo con la misma pasión del primer día: 
                <strong className="text-primary"> defender a las personas, no solo casos.</strong>
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-base-300 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://placehold.co/600x400"
                  alt="Luis Cruz"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-content p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Años de experiencia</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section data-theme="dark" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold text-center mb-16"
          >
            Mi Trayectoria Profesional
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 hidden md:block" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                    <div className="hidden md:block text-primary font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-base-content/80">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-base-100 hidden md:block" />
                
                {/* Mobile year indicator */}
                <div className="md:hidden absolute -left-2 top-0 bg-primary text-primary-content px-2 py-1 rounded text-sm font-bold">
                  {milestone.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Values */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold text-center mb-16"
          >
            Mi Filosofía de Trabajo
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <SimpleCard title={value.title}>
                  <div className="text-4xl mb-4 text-center">{value.icon}</div>
                  <p className="text-center">{value.description}</p>
                </SimpleCard>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-base-200 p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h3>
            <p className="text-lg mb-6">
              En un mundo de grandes bufetes y procesos impersonales, yo ofrezco algo diferente: 
              <strong className="text-primary"> atención personal, comunicación directa y compromiso real</strong> con tu caso.
            </p>
            <p className="text-lg">
              No soy solo tu abogado durante el procedimiento. Soy tu consejero, 
              tu defensor y, cuando todo termine, alguien en quien puedes confiar para el futuro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personal Touch Section */}
      <section data-theme="dark" className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold mb-8"
          >
            Más allá del Derecho
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            <div className="p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Formación Continua</h3>
              <p>Actualización constante en las últimas tendencias legales y tecnológicas</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-semibold mb-2">Vida Familiar</h3>
              <p>Padre de dos hijos, entiendo la importancia de proteger lo que más amamos</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🏃‍♂️</div>
              <h3 className="text-xl font-semibold mb-2">Equilibrio</h3>
              <p>Deportista aficionado que cree en la importancia del equilibrio vida-trabajo</p>
            </div>
          </motion.div>
          
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl italic border-l-4 border-primary pl-6 mb-8"
          >
            "El derecho no es solo conocer las leyes, sino entender a las personas 
            y luchar por la justicia que cada historia merece."
          </motion.blockquote>
          <cite className="text-base font-medium">— Luis Cruz</cite>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">¿Necesitas ayuda legal?</h2>
          <p className="text-lg mb-8">
            No importa cuán complejo sea tu caso. Si necesitas a alguien que luche por ti 
            con la misma pasión que pondría en defender a su propia familia, 
            estamos aquí para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-primary btn-lg"
            >
              Solicitar Consulta Gratuita
            </Link>
            <Link
              href="/services"
              className="btn btn-outline btn-lg"
            >
              Ver Nuestros Servicios
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
