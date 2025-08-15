"use client";

import HeroBanner from "@/components/ui/banners/HeroBanner";
import HeroTitle from "@/components/ui/banners/HeroTitle";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === "/about") return "about";
    if (pathname === "/about/career") return "career";
    if (pathname === "/about/values") return "values";
    if (pathname === "/about/team") return "team";
    return "about";
  };

  const activeTab = getActiveTab();

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner resourceUrl="/images/bible.webp" yShift={85}>
        <HeroTitle
          title="Nuestra Historia"
          subtitle="Conoce quiénes somos, qué nos motiva y cómo hemos llegado hasta aquí."
        />
      </HeroBanner>

      {/* Navigation Tabs */}
      <section id="nav-tab" className="px-6 py-8 bg-base-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tabs tabs-boxed justify-center"
          >
            <NavLinks activeTab={activeTab} />
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section id="about-content" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">{children}</div>
      </section>

      {/* Bottom Navigation Tabs */}
      <section data-theme="dark" className="px-6 py-8 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="tabs tabs-boxed justify-center"
          >
            <NavLinks activeTab={activeTab} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center text-sm text-base-content/60 mt-4"
          >
            Explora más contenido cambiando de sección
          </motion.p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold mb-6"
          >
            ¿Listo para trabajar juntos?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg mb-8"
          >
            Contacta con nosotros para una consulta personalizada sobre tu caso.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/old/contact"
              className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl md:btn-ghost"
            >
              <span className="hidden md:inline">Reserva una</span>
              <span className="md:underline">Consulta Gratuita</span>
            </Link>
            <Link
              href="/old/services"
              className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary transition"
            >
              Ver Nuestros Servicios
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function NavLinks({ activeTab }: { activeTab: string }) {
  return (
    <>
      <Link
        href="/old/about"
        className={`tab ${activeTab === "about" ? "tab-active" : ""}`}
      >
        Nuestra Historia
      </Link>
      <Link
        href="/old/about/career"
        className={`tab ${activeTab === "career" ? "tab-active" : ""}`}
      >
        Nuestra Carrera
      </Link>
      <Link
        href="/old/about/values"
        className={`tab ${activeTab === "values" ? "tab-active" : ""}`}
      >
        Nuestros Valores
      </Link>
      <Link
        href="/old/about/team"
        className={`tab ${activeTab === "team" ? "tab-active" : ""}`}
      >
        Nuestro Equipo
      </Link>
    </>
  );
}
