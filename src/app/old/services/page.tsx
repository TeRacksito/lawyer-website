"use client";

import HeroBanner from "@/components/ui/banners/HeroBanner";
import HeroTitle from "@/components/ui/banners/HeroTitle";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export interface IServiceCard {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface IServicesPageProps {}

function normalize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return text;

  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query);

  const matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex === -1) return text;

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <>
      {before}
      <span className="text-primary font-bold">{match}</span>
      {after}
    </>
  );
}

export default function ServicesPage(props: IServicesPageProps) {
  const services: IServiceCard[] = [
    {
      id: 0,
      title: "Derecho Penal",
      description:
        "Defensa integral en casos penales, desde delitos menores hasta crímenes graves.",
      link: "/services/derecho-penal",
    },
    {
      id: 1,
      title: "Derecho Civil",
      description:
        "Asesoría y representación en asuntos civiles, incluyendo contratos y disputas familiares.",
      link: "/services/derecho-civil",
    },
    {
      id: 2,
      title: "Derecho Laboral",
      description:
        "Protección de derechos laborales y asesoría en conflictos laborales.",
      link: "/services/derecho-laboral",
    },
    {
      id: 3,
      title: "Derecho Mercantil",
      description:
        "Asistencia legal a empresas y autónomos en contratos mercantiles, sociedades y conflictos comerciales.",
      link: "/services/derecho-mercantil",
    },
    {
      id: 4,
      title: "Derecho Administrativo",
      description:
        "Representación ante la Administración Pública y en procedimientos contencioso-administrativos.",
      link: "/services/derecho-administrativo",
    },
    {
      id: 5,
      title: "Derecho de Familia",
      description:
        "Divorcios, custodias, pensiones alimenticias y otros asuntos familiares sensibles.",
      link: "/services/derecho-familia",
    },
    {
      id: 6,
      title: "Derecho Inmobiliario",
      description:
        "Asesoría en compraventa, arrendamientos, herencias y conflictos relacionados con bienes inmuebles.",
      link: "/services/derecho-inmobiliario",
    },
    {
      id: 7,
      title: "Herencias y Sucesiones",
      description:
        "Tramitación de herencias, testamentos y resolución de disputas entre herederos.",
      link: "/services/herencias-sucesiones",
    },
    {
      id: 8,
      title: "Derecho Bancario y Financiero",
      description:
        "Reclamaciones por cláusulas abusivas, hipotecas y conflictos con entidades financieras.",
      link: "/services/derecho-bancario",
    },
    {
      id: 9,
      title: "Derecho Fiscal y Tributario",
      description:
        "Asesoría en obligaciones fiscales, inspecciones de Hacienda y planificación tributaria.",
      link: "/services/derecho-fiscal",
    },
    {
      id: 10,
      title: "Extranjería e Inmigración",
      description:
        "Gestión de permisos de residencia, nacionalidad, reagrupación familiar y procedimientos de expulsión.",
      link: "/services/extranjeria",
    },
    {
      id: 11,
      title: "Derecho de Consumo",
      description:
        "Defensa de los derechos de consumidores ante prácticas abusivas de empresas o productos defectuosos.",
      link: "/services/consumo",
    },
    {
      id: 12,
      title: "Propiedad Intelectual e Industrial",
      description:
        "Protección de marcas, patentes, derechos de autor y defensa frente a infracciones.",
      link: "/services/propiedad-intelectual",
    },
    {
      id: 13,
      title: "Delitos Informáticos y Ciberseguridad",
      description:
        "Asistencia en casos de fraude online, suplantación de identidad y delitos tecnológicos.",
      link: "/services/delitos-informaticos",
    },
    {
      id: 14,
      title: "Derecho Sanitario",
      description:
        "Negligencias médicas, reclamaciones a centros de salud y defensa de pacientes y profesionales.",
      link: "/services/derecho-sanitario",
    },
    {
      id: 15,
      title: "Mediación y Resolución de Conflictos",
      description:
        "Soluciones extrajudiciales a través de mediación civil, familiar o mercantil.",
      link: "/services/mediacion",
    },
    {
      id: 16,
      title: "Compliance y Derecho Corporativo",
      description:
        "Implantación de programas de cumplimiento normativo y prevención de riesgos legales en empresas.",
      link: "/services/compliance",
    },
    {
      id: 17,
      title: "Protección de Datos (LOPDGDD y RGPD)",
      description:
        "Adaptación legal a la normativa de protección de datos y defensa ante la AEPD.",
      link: "/services/proteccion-datos",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(
    (service) =>
      normalize(service.title).includes(normalize(searchQuery)) ||
      normalize(service.description).includes(normalize(searchQuery))
  );

  const perItemDelay = 0.6 / services.length;

  return (
    <>
      {/* Banner */}
      <HeroBanner resourceUrl="/images/bookshelf.webp">
        <HeroTitle
          title="Nuestros Servicios"
          subtitle="Descubre cómo podemos ayudarte con soluciones personalizadas y efectivas."
        />
      </HeroBanner>

      <section id="services" className="px-6 py-24">
        <article className="max-w-5xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold text-center mb-10"
          >
            Consulta gratuita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-center mb-6"
          >
            Ofrecemos una consulta gratuita para evaluar tu caso y ofrecerte
            soluciones personalizadas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center"
          >
            <Link
              href="/old/contact"
              className="btn btn-primary btn-lg transition"
            >
              Solicitar Consulta Gratuita
            </Link>
          </motion.div>
        </article>

        <article>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold text-center mb-10"
          >
            Áreas de práctica
          </motion.h2>
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 max-w-md mx-auto relative"
          >
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Limpiar búsqueda"
              >
                &#10005;
              </button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-sm sm:max-w-5xl mx-auto">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * perItemDelay, duration: 0.5 }}
                className="card bg-base-200 shadow-lg"
              >
                <figure>
                  <img
                    src="https://placehold.co/600x400"
                    alt="Service Image"
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">
                    <div>
                      <HighlightMatch
                        text={service.title}
                        query={searchQuery}
                      />
                    </div>
                  </h3>
                  <p className="mb-4">
                    <HighlightMatch
                      text={service.description}
                      query={searchQuery}
                    />
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={service.link}
                      className="link link-primary link-hover"
                    >
                      Más información
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
