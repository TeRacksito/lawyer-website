"use client";
import SimpleCard from "@/components/ui/cards/SimpleCard";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ILandingPageProps {}

export default function LandingPage(props: ILandingPageProps) {
  return (
    <>
      {/* Hero Section with background image */}
      <section
        data-theme="dark"
        className="relative w-full h-screen flex items-center justify-center text-center"
      >
        <div className="absolute inset-0 bg-[url('https://placehold.co/600x400')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-6"
          >
            Defensa con propósito.
            <br /> Justicia con rostro humano.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-muted"
          >
            Soy <strong className="text-primary font-bold">Luis Cruz</strong>,
            abogado independiente con enfoque personalizado en derecho penal y
            civil. Más que defender casos, defiendo personas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-row justify-center gap-4"
          >
            <button className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-ghost">
              Reserva una consulta
            </button>
            <button className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary transition">
              Conoce mi historia
            </button>
          </motion.div>
        </div>
      </section>

      {/* Decorative cross divider */}
      <div className="w-full flex justify-center my-20">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-l-2 border-b-2 rotate-45 border-muted" />
        </div>
      </div>

      {/* Practice Areas */}
      <section id="practice" className="px-6 pb-24">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Áreas de práctica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <SimpleCard title="Derecho Penal">
            <p>
              Defensa penal estratégica y humana en casos complejos, con
              atención absoluta a cada detalle.
            </p>
          </SimpleCard>
          <SimpleCard title="Derecho Civil">
            <p>
              Asesoría y representación en conflictos familiares, patrimoniales
              y contractuales.
            </p>
          </SimpleCard>
          <SimpleCard title="Mediación">
            <p>
              Resolución alternativa de conflictos desde una perspectiva humana
              y eficiente.
            </p>
          </SimpleCard>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-theme="dark" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">¿Quién es Luis Cruz?</h2>
          <p className="text-lg">
            Con más de 15 años de experiencia en tribunales, Luis Cruz se ha
            ganado la confianza de sus clientes gracias a su compromiso ético,
            claridad y entrega absoluta en cada caso. Su enfoque combina la
            técnica jurídica con la empatía, entendiendo que detrás de cada
            expediente hay una historia humana.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Testimonios
        </h2>
        <div className="max-w-4xl mx-auto text-center ">
          <blockquote className="italic border-l-4 border-primary pl-6 text-lg">
            “Gracias al doctor Cruz, pude recuperar la tranquilidad de mi
            familia. No es solo un abogado, es una persona que escucha y actúa.”
          </blockquote>
          <p className="mt-4 font-medium">— Mariana G., clienta</p>
        </div>
      </section>
    </>
  );
}
