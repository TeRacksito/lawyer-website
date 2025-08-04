"use client";

import { motion } from "framer-motion";
import SpainMap from "@/components/ui/maps/SpainMap";
import AnimatedCounter from "@/components/ui/stats/AnimatedCounter";

export interface ITeamPageProps {}

export interface ITeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  specialties: string[];
  location?: string;
  type: "core" | "collaborator";
}

export interface ICollaboratorStats {
  totalCities: number;
  totalCollaborators: number;
  yearsExperience: number;
  casesHandled: number;
}

export default function TeamPage(props: ITeamPageProps) {
  const coreTeamMembers: ITeamMember[] = [
    {
      id: 1,
      name: "Luis Cruz Martínez",
      position: "Socio Fundador",
      description: "Con más de 15 años de experiencia en derecho penal y civil, Luis ha defendido con éxito más de 500 casos. Especialista en casos complejos con enfoque humanizado.",
      image: "https://placehold.co/300x400/3B82F6/FFFFFF?text=Luis+Cruz",
      specialties: ["Derecho Penal", "Derecho Civil", "Mediación"],
      location: "Madrid",
      type: "core",
    },
    {
      id: 2,
      name: "María González Ruiz",
      position: "Socia Directora",
      description: "Experta en derecho mercantil y societario con 12 años de experiencia. Ha asesorado a más de 200 empresas en procesos de restructuración y fusiones.",
      image: "https://placehold.co/300x400/10B981/FFFFFF?text=María+González",
      specialties: ["Derecho Mercantil", "Derecho Societario", "Fusiones y Adquisiciones"],
      location: "Madrid",
      type: "core",
    },
    {
      id: 3,
      name: "Carlos Mendoza López",
      position: "Abogado Senior",
      description: "Especialista en derecho laboral y de la seguridad social. 10 años de experiencia representando tanto a empresas como a trabajadores en conflictos laborales.",
      image: "https://placehold.co/300x400/8B5CF6/FFFFFF?text=Carlos+Mendoza",
      specialties: ["Derecho Laboral", "Seguridad Social", "Negociación Colectiva"],
      location: "Madrid",
      type: "core",
    },
  ];

  const collaboratorStats: ICollaboratorStats = {
    totalCities: 10,
    totalCollaborators: 25,
    yearsExperience: 8,
    casesHandled: 1200,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Nuestro Equipo & Red de Colaboradores
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-xl text-center mb-16 max-w-4xl mx-auto"
      >
        Un <span className="text-primary font-semibold">equipo central</span> de abogados especializados 
        respaldado por una <span className="text-primary font-semibold">extensa red de colaboradores</span> 
        {" "}en toda España. Profesionales comprometidos con la excelencia legal y el servicio personalizado.
      </motion.p>

      {/* Core Team Section */}
      <section className="mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12"
        >
          Equipo Central
        </motion.h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {coreTeamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="card bg-base-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <figure className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-2 right-2">
                  <div className="badge badge-primary badge-sm">{member.location}</div>
                </div>
              </figure>
              <div className="card-body">
                <h4 className="card-title text-xl">{member.name}</h4>
                <div className="badge badge-primary badge-outline mb-3">{member.position}</div>
                <p className="text-base-content/80 mb-4 text-sm leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, i) => (
                    <span key={i} className="badge badge-secondary badge-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Decorative divider */}
      <div className="w-full flex justify-center my-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-12 h-12"
        >
          <div className="absolute inset-0 border-l-2 border-b-2 rotate-45 border-primary/60" />
        </motion.div>
      </div>

      {/* Collaborators Network Section */}
      <section className="mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-8"
        >
          Red de Colaboradores en España
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-center mb-12 max-w-3xl mx-auto text-base-content/80"
        >
          Trabajamos con una red cuidadosamente seleccionada de abogados especialistas 
          en las principales ciudades de España, garantizando cobertura nacional y expertise local.
        </motion.p>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.6 }}
            className="text-center p-6 bg-base-200 rounded-lg"
          >
            <div className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={collaboratorStats.totalCities} duration={2000} />
            </div>
            <div className="text-sm font-medium">Ciudades</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center p-6 bg-base-200 rounded-lg"
          >
            <div className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={collaboratorStats.totalCollaborators} duration={2200} suffix="+" />
            </div>
            <div className="text-sm font-medium">Colaboradores</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center p-6 bg-base-200 rounded-lg"
          >
            <div className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={collaboratorStats.yearsExperience} duration={1800} suffix="+" />
            </div>
            <div className="text-sm font-medium">Años Promedio</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center p-6 bg-base-200 rounded-lg"
          >
            <div className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={collaboratorStats.casesHandled} duration={2500} suffix="+" />
            </div>
            <div className="text-sm font-medium">Casos Exitosos</div>
          </motion.div>
        </div>

        {/* Interactive Spain Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-base-200 rounded-2xl p-8 shadow-lg"
        >
          <h4 className="text-2xl font-semibold text-center mb-6">
            Cobertura Nacional
          </h4>
          <p className="text-center text-base-content/70 mb-8 max-w-2xl mx-auto">
            Interactúa con el mapa para conocer nuestros colaboradores en cada región. 
            Cada punto representa un abogado especializado listo para asistirte.
          </p>
          
          <div className="relative">
            <SpainMap className="max-w-4xl mx-auto" showAnimation={true} />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Our Network Section */}
      <section 
        data-theme="dark" 
        className="bg-base-200 rounded-2xl p-12 mb-16"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12"
        >
          ¿Por qué elegir nuestra red?
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Conocimiento Local</h4>
            <p className="text-base-content/70">
              Cada colaborador conoce profundamente las particularidades legales 
              y judiciales de su región.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Calidad Garantizada</h4>
            <p className="text-base-content/70">
              Todos nuestros colaboradores han sido cuidadosamente seleccionados 
              por su experiencia y ética profesional.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Respuesta Rápida</h4>
            <p className="text-base-content/70">
              Network integrado que permite respuestas inmediatas 
              y coordinación eficiente en todo el territorio.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
