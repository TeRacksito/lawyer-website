"use client";
import HeroBanner from "@/components/ui/banners/HeroBanner";
import SimpleCard from "@/components/ui/cards/SimpleCard";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ILandingPageProps {}

export default function LandingPage(props: ILandingPageProps) {
  return (
    <>
      {/* Hero Section with background image */}
      <HeroBanner fullScreen resourceUrl="/images/law-balance.webp">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Defensa con propósito.
          <br /> Justicia con rostro humano.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base md:text-xl max-w-xl mx-auto text-muted"
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
          <Link
            href="/contact"
            className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl md:btn-ghost"
          >
            <span className="hidden md:inline">Reserva una</span><span className="md:underline">Consulta Gratuita</span>
          </Link>
          <Link
            href="/luis-cruz"
            className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary transition"
          >
            Conoce mi historia
          </Link>
        </motion.div>
      </HeroBanner>

      {/* Decorative cross divider */}
      <div className="w-full flex justify-center my-16 md:my-20">
        <div className="relative w-8 h-8 md:w-12 md:h-12">
          <div className="absolute inset-0 border-l-2 border-b-2 rotate-45 border-muted" />
        </div>
      </div>

      {/* Practice Areas */}
      <section id="practice" className="px-4 md:px-6 pb-16 md:pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-10">
          Áreas de práctica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl md:max-w-5xl mx-auto">
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
      <section id="about" data-theme="dark" className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-3xl md:max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">¿Quién es Luis Cruz?</h2>
          <p className="text-base md:text-lg">
            Con más de 15 años de experiencia en tribunales, Luis Cruz se ha
            ganado la confianza de sus clientes gracias a su compromiso ético,
            claridad y entrega absoluta en cada caso. Su enfoque combina la
            técnica jurídica con la empatía, entendiendo que detrás de cada
            expediente hay una historia humana.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 md:px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-10">
          Testimonios
        </h2>
        <div className="max-w-3xl md:max-w-4xl mx-auto text-center ">
          <blockquote className="italic border-l-4 border-primary pl-4 md:pl-6 text-base md:text-lg">
            “Gracias al doctor Cruz, pude recuperar la tranquilidad de mi
            familia. No es solo un abogado, es una persona que escucha y actúa.”
          </blockquote>
          <p className="mt-4 font-medium">— Mariana G., clienta</p>
        </div>
      </section>
    </>
  );
}
