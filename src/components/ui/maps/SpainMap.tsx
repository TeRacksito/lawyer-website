"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import CollaboratorCard, { type Collaborator } from "../cards/CollaboratorCard";

// Spain TopoJSON URL - using Natural Earth data (more reliable)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// Major Spanish cities (proper lat/long coordinates)
const cities = [
  { 
    name: "Madrid", 
    coordinates: [-3.7038, 40.4168] as [number, number], 
    description: "Sede central"
  },
  { 
    name: "Valencia", 
    coordinates: [-0.3763, 39.4699] as [number, number], 
    description: "Derecho civil"
  },
  { 
    name: "Sevilla", 
    coordinates: [-5.9845, 37.3891] as [number, number], 
    description: "Derecho laboral"
  },
  { 
    name: "Zaragoza", 
    coordinates: [-0.8773, 41.6518] as [number, number], 
    description: "Derecho fiscal"
  },
  { 
    name: "Málaga", 
    coordinates: [-4.4214, 36.7213] as [number, number], 
    description: "Derecho inmobiliario"
  },
  { 
    name: "Murcia", 
    coordinates: [-1.1307, 37.9922] as [number, number], 
    description: "Derecho penal"
  },
  { 
    name: "Palma", 
    coordinates: [2.6502, 39.5696] as [number, number], 
    description: "Derecho marítimo"
  },
  { 
    name: "Las Palmas", 
    coordinates: [-15.4138, 28.1235] as [number, number], 
    description: "Derecho internacional"
  },
  { 
    name: "Bilbao", 
    coordinates: [-2.9253, 43.2627] as [number, number], 
    description: "Derecho empresarial"
  },
  { 
    name: "Alicante", 
    coordinates: [-0.4817, 38.3452] as [number, number], 
    description: "Derecho turístico y comercial"
  },
  { 
    name: "Córdoba", 
    coordinates: [-4.7793, 37.8882] as [number, number], 
    description: "Derecho agrario y rural"
  },
  { 
    name: "Valladolid", 
    coordinates: [-4.7245, 41.6523] as [number, number], 
    description: "Derecho administrativo"
  },
  { 
    name: "Vigo", 
    coordinates: [-8.7226, 42.2406] as [number, number], 
    description: "Derecho marítimo y pesquero"
  },
  { 
    name: "A Coruña", 
    coordinates: [-8.4115, 43.3623] as [number, number], 
    description: "Derecho portuario"
  },
  { 
    name: "Granada", 
    coordinates: [-3.5986, 37.1773] as [number, number], 
    description: "Derecho patrimonial"
  },
  { 
    name: "Oviedo", 
    coordinates: [-5.8302, 43.3603] as [number, number], 
    description: "Derecho de la construcción"
  },
  { 
    name: "Santa Cruz de Tenerife", 
    coordinates: [-16.2518, 28.4636] as [number, number], 
    description: "Derecho insular"
  },
  { 
    name: "Barcelona",
    coordinates: [2.1098, 41.5432] as [number, number], 
    description: "Derecho bancario"
  },
  { 
    name: "Pamplona", 
    coordinates: [-1.6440, 42.8125] as [number, number], 
    description: "Derecho foral navarro"
  },
];

// Collaborators data (separate from cities)
const collaborators: Collaborator[] = [
  { 
    id: 2,
    name: "Ana García López", 
    specialty: "Derecho Mercantil", 
    mainFocus: "Experta en fusiones, adquisiciones y derecho societario",
    experience: "12 años de experiencia",
    cities: ["Madrid", "Segovia"],
    photo: "/images/collaborators/ana-garcia.jpg"
  },
  { 
    id: 3,
    name: "Jordi Puig Valls", 
    specialty: "Derecho Mercantil y Societario", 
    mainFocus: "Especialista en startups y financiación empresarial",
    experience: "10 años de experiencia",
    cities: ["Barcelona", "Girona"],
    photo: "/images/collaborators/jordi-puig.jpg"
  },
  { 
    id: 4,
    name: "Marta Soler Ribas", 
    specialty: "Derecho Internacional", 
    mainFocus: "Experta en comercio internacional y arbitraje",
    experience: "14 años de experiencia",
    cities: ["Barcelona", "Valencia"],
    photo: "/images/collaborators/marta-soler.jpg"
  },
  { 
    id: 5,
    name: "Carmen Martí Flores", 
    specialty: "Derecho Civil y Familiar", 
    mainFocus: "Especializada en mediación familiar y herencias",
    experience: "18 años de experiencia",
    cities: ["Valencia", "Castellón"],
    photo: "/images/collaborators/carmen-marti.jpg"
  },
  { 
    id: 6,
    name: "Manuel Ruiz Fernández", 
    specialty: "Derecho Laboral", 
    mainFocus: "Experto en relaciones laborales y convenios colectivos",
    experience: "16 años de experiencia",
    cities: ["Sevilla", "Córdoba"],
    photo: "/images/collaborators/manuel-ruiz.jpg"
  },
  { 
    id: 7,
    name: "Pilar Navarro Sanz", 
    specialty: "Derecho Fiscal y Tributario", 
    mainFocus: "Especialista en planificación fiscal para empresas",
    experience: "13 años de experiencia",
    cities: ["Zaragoza", "Huesca"],
    photo: "/images/collaborators/pilar-navarro.jpg"
  },
  { 
    id: 8,
    name: "Francisco Moreno Gil", 
    specialty: "Derecho Inmobiliario", 
    mainFocus: "Experto en transacciones inmobiliarias complejas",
    experience: "20 años de experiencia",
    cities: ["Málaga", "Marbella"],
    photo: "/images/collaborators/francisco-moreno.jpg"
  },
  { 
    id: 9,
    name: "Isabel López Hernández", 
    specialty: "Derecho Penal", 
    mainFocus: "Especializada en derecho penal económico",
    experience: "11 años de experiencia",
    cities: ["Murcia", "Cartagena"],
    photo: "/images/collaborators/isabel-lopez.jpg"
  },
  { 
    id: 10,
    name: "Miguel Amengual Vich", 
    specialty: "Derecho Marítimo", 
    mainFocus: "Experto en derecho naviero y seguros marítimos",
    experience: "17 años de experiencia",
    cities: ["Palma", "Ibiza"],
    photo: "/images/collaborators/miguel-amengual.jpg"
  },
  { 
    id: 11,
    name: "Rosa Pérez Santana", 
    specialty: "Derecho Internacional", 
    mainFocus: "Especialista en derecho comunitario europeo",
    experience: "9 años de experiencia",
    cities: ["Las Palmas", "Tenerife"],
    photo: "/images/collaborators/rosa-perez.jpg"
  },
  { 
    id: 12,
    name: "Iñaki Etxeberria Gómez", 
    specialty: "Derecho Empresarial", 
    mainFocus: "Experto en reestructuraciones y crisis empresariales",
    experience: "19 años de experiencia",
    cities: ["Bilbao", "San Sebastián"],
    photo: "/images/collaborators/inaki-etxeberria.jpg"
  },
  { 
    id: 13,
    name: "Patricia Vázquez Ramos", 
    specialty: "Derecho Administrativo", 
    mainFocus: "Especializada en contratación pública y urbanismo",
    experience: "8 años de experiencia",
    cities: ["Madrid", "Barcelona"],
    photo: "/images/collaborators/patricia-vazquez.jpg"
  },
  { 
    id: 14,
    name: "Carlos Jiménez Morales", 
    specialty: "Derecho Tributario", 
    mainFocus: "Experto en fiscalidad internacional y transfer pricing",
    experience: "14 años de experiencia",
    cities: ["Valencia", "Alicante"],
    photo: "/images/collaborators/carlos-jimenez.jpg"
  },
  { 
    id: 15,
    name: "Elena Rodríguez Cabrera", 
    specialty: "Derecho de Familia", 
    mainFocus: "Especialista en custodia compartida y violencia de género",
    experience: "12 años de experiencia",
    cities: ["Sevilla", "Málaga"],
    photo: "/images/collaborators/elena-rodriguez.jpg"
  }
];

export interface ISpainMapProps {
  className?: string;
  showAnimation?: boolean;
}

export default function SpainMap({ className = "", showAnimation = true }: ISpainMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const isMobile = windowSize.width < 640;

  // Handle collaborator contact
  const handleCollaboratorContact = (collaborator: Collaborator) => {
    // Here you can implement the contact functionality
    // For example, open a modal, send an email, etc.
    console.log(`Contacting ${collaborator.name}`);
    // You could also emit an event or call a prop function
  };

  // Handle window resize for responsive map
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Responsive map configuration
  const getMapConfig = () => {
    const isMobile = windowSize.width < 530;
    const isTablet = windowSize.width < 1024;
    
    return {
      scale: isMobile ? 2450 : isTablet ? 2100 : 2400,
      center: (isMobile ? [-2.5, 40.3] : [-4, 40]) as [number, number],
      width: isMobile ? 600 : 800,
      height: isMobile ? 400 : 500
    };
  };

  const mapConfig = getMapConfig();

  // Get collaborators for a specific city
  const getCollaboratorsForCity = (cityName: string) => {
    return collaborators.filter(collaborator => 
      collaborator.cities.includes(cityName)
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: mapConfig.scale,
          center: mapConfig.center,
        }}
        width={mapConfig.width}
        height={mapConfig.height}
        className="w-full h-auto border border-base-300 rounded-lg bg-base-50 
                   md:min-h-[400px] min-h-[300px] max-h-[500px] md:max-h-none"
        style={{
          // Responsive scaling for mobile
          aspectRatio: "16/10"
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // More comprehensive Spain detection
              const spainGeography = geographies.find((geo) => {
                const props = geo.properties;
                return (
                  props.NAME === "Spain" || 
                  props.NAME_EN === "Spain" ||
                  props.ADMIN === "Spain" ||
                  props.NAME_LONG === "Spain" ||
                  props.SOVEREIGNT === "Spain" ||
                  geo.id === "724" || // ISO numeric code
                  props.ISO_A2 === "ES" || // ISO 2-letter code
                  props.ISO_A3 === "ESP" // ISO 3-letter code
                );
              });

              if (!spainGeography) {
                // Debug: log available countries to help identify the correct property
                console.log("Spain not found. Available geographies:", 
                  geographies.slice(0, 5).map(g => ({
                    id: g.id,
                    properties: Object.keys(g.properties),
                    sampleProps: {
                      NAME: g.properties.NAME,
                      NAME_EN: g.properties.NAME_EN,
                      ADMIN: g.properties.ADMIN,
                      ISO_A2: g.properties.ISO_A2
                    }
                  }))
                );
                
                // Fallback: try to find Spain in different ways
                const fallbackSpain = geographies.find(geo => 
                  Object.values(geo.properties).some(value => 
                    typeof value === 'string' && value.toLowerCase().includes('spain')
                  )
                );
                
                if (fallbackSpain) {
                  console.log("Found Spain via fallback:", fallbackSpain.properties);
                  return (
                    <Geography
                      key={fallbackSpain.rsmKey}
                      geography={fallbackSpain}
                      fill="hsl(var(--p))"
                      fillOpacity={0.15}
                      stroke="hsl(var(--p))"
                      strokeWidth={1.5}
                      className="outline-none transition-all duration-300 hover:fill-opacity-25"
                    />
                  );
                }
                
                return (
                  <text
                    x={400}
                    y={250}
                    textAnchor="middle"
                    className="fill-base-content text-sm"
                  >
                    Loading Spain map...
                  </text>
                );
              }

              return (
                <Geography
                  key={spainGeography.rsmKey}
                  geography={spainGeography}
                  fill="hsl(var(--p))"
                  fillOpacity={0.15}
                  stroke="hsl(var(--p))"
                  strokeWidth={1.5}
                  className="outline-none transition-all duration-300 hover:fill-opacity-25"
                />
              );
            }}
          </Geographies>

          {/* City markers */}
          {cities.map((city, index) => (
            <Marker
              key={city.name}
              coordinates={city.coordinates}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
            >
              {showAnimation ? (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.5 + index * 0.15, // Base delay + staggered delay
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Pulsing ring animation */}
                  <motion.circle
                    r={8}
                    fill="none"
                    stroke="hsl(var(--p))"
                    strokeWidth={2}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ 
                      scale: [0, 1, 1.5, 1],
                      opacity: [0, 0.8, 0.2, 0.8]
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.8 + index * 0.15, // Slightly after main marker appears
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0,
                      ease: "easeInOut"
                    }}
                    className="hidden sm:block" // Hide pulsing rings on mobile to reduce clutter
                  />
                  
                  {/* Main marker - bigger for mobile, different colors for selected */}
                  <motion.circle
                    r={hoveredCity === city.name ? (isMobile ? 12 : 8) : (isMobile ? 10 : 6)}
                    fill={selectedCity === city.name ? "hsl(var(--p))" : "hsl(var(--p))"}
                    stroke={selectedCity === city.name ? "hsl(var(--pf))" : "white"}
                    strokeWidth={selectedCity === city.name ? 3 : 2}
                    className="cursor-pointer"
                    animate={{
                      r: hoveredCity === city.name ? (isMobile ? 12 : 8) : (isMobile ? 10 : 6),
                      fill: selectedCity === city.name ? "hsl(var(--pf))" : "hsl(var(--p))",
                      stroke: selectedCity === city.name ? "hsl(var(--p))" : "white",
                      strokeWidth: selectedCity === city.name ? 3 : 2,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* City label - bigger text for mobile */}
                  <motion.text
                    textAnchor="middle"
                    y={-15}
                    className="fill-base-content font-semibold pointer-events-none 
                               text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: -15 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.7 + index * 0.15, // After marker but before pulsing
                      duration: 0.5 
                    }}
                    animate={{
                      fontSize: hoveredCity === city.name ? (isMobile ? "16px" : "18px") : (isMobile ? "14px" : "16px"),
                    }}
                  >
                    {city.name}
                  </motion.text>
                </motion.g>
              ) : (
                <g>
                  <circle
                    r={isMobile ? 8 : 6}
                    fill={selectedCity === city.name ? "hsl(var(--pf))" : "hsl(var(--p))"}
                    stroke={selectedCity === city.name ? "hsl(var(--p))" : "white"}
                    strokeWidth={selectedCity === city.name ? 3 : 2}
                    className="cursor-pointer"
                  />
                  <text
                    textAnchor="middle"
                    y={-15}
                    className="fill-base-content font-semibold pointer-events-none
                               text-sm sm:text-base md:text-lg"
                  >
                    {city.name}
                  </text>
                </g>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* City information panel - Desktop only for hover */}
      {hoveredCity && !selectedCity && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-4 right-4 
                     bg-base-100 shadow-lg rounded-lg p-4 
                     max-w-xs text-sm
                     z-10"
        >
          {(() => {
            const city = cities.find(c => c.name === hoveredCity);
            if (!city) return null;
            
            const cityCollaborators = getCollaboratorsForCity(city.name);
            
            return (
              <>
                <h4 className="font-bold text-lg text-primary mb-1">{city.name}</h4>
                <p className="text-sm leading-relaxed mb-2">{city.description}</p>
                <div className="mt-2 pt-2 border-t border-base-300">
                  <p className="text-xs text-base-content/60">
                    {cityCollaborators.length} colaborador{cityCollaborators.length !== 1 ? 'es' : ''} en esta región
                  </p>
                  <p className="text-xs text-base-content/60 mt-1">
                    Haz clic para filtrar
                  </p>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}

      {/* Selected city modal - Desktop only, mobile shows inline */}
      {selectedCity && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-50 bg-base-100 shadow-xl rounded-lg top-4 right-4 max-w-sm"
        >
          {(() => {
            const city = cities.find(c => c.name === selectedCity);
            if (!city) return null;
            
            const cityCollaborators = getCollaboratorsForCity(city.name);
            
            return (
              <div className="p-4">
                {/* Header with close button */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-primary">{city.name}</h4>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="btn btn-sm btn-ghost btn-circle"
                    aria-label="Cerrar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm leading-relaxed mb-4">{city.description}</p>
                
                {/* Simple collaborator count */}
                <div className="border-t border-base-300 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {cityCollaborators.length} colaborador{cityCollaborators.length !== 1 ? 'es' : ''} en esta región
                    </span>
                    <span className="text-xs text-base-content/60">
                      Ver lista completa abajo
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Collaborators list below map */}
      <div className="mt-8">
        {/* Mobile selected city indicator */}
        {selectedCity && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg"
          >
            {(() => {
              const city = cities.find(c => c.name === selectedCity);
              const cityCollaborators = getCollaboratorsForCity(selectedCity);
              
              return (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">{city?.name}</h4>
                    <p className="text-sm text-base-content/70">
                      {cityCollaborators.length} colaborador{cityCollaborators.length !== 1 ? 'es' : ''} en esta región
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="btn btn-sm btn-ghost"
                  >
                    Ver todos
                  </button>
                </div>
              );
            })()}
          </motion.div>
        )}

                
        {!selectedCity && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-base-content/60 my-6"
          >
            Haz clic en cualquier ciudad del mapa para filtrar por región
          </motion.p>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold">
            {selectedCity ? `Colaboradores en ${selectedCity}` : 'Todos nuestros colaboradores'}
          </h4>
          {selectedCity && !isMobile && (
            <button
              onClick={() => setSelectedCity(null)}
              className="btn btn-sm btn-outline"
            >
              Ver todos
            </button>
          )}
        </div>
        
        <div className={`grid gap-4 ${
          selectedCity 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' // Bigger cards when filtered
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' // Smaller cards when showing all
        }`}>
          {(() => {
            const collaboratorsToShow = selectedCity 
              ? collaborators.filter(collaborator => collaborator.cities.includes(selectedCity))
              : collaborators;
            
            return collaboratorsToShow.map((collaborator, idx) => (
              <CollaboratorCard
                key={collaborator.id}
                collaborator={collaborator}
                mode={selectedCity ? 'extended' : 'minified'}
                animationDelay={idx * 0.1}
                onContact={handleCollaboratorContact}
              />
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
