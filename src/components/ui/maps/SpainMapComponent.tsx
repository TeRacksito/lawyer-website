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
import { SPANISH_CITIES, City } from "@/lib/constants/spanish-cities";
import { Collaborator } from "@/components/blocks/special-blocks/interactive-map/InteractiveMap";
import CollaboratorCard from "./CollaboratorCard";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

export interface SpainMapComponentProps {
  collaborators?: Collaborator[];
  showAnimation?: boolean;
  className?: string;
  dataTinaField?: string;
}

export default function SpainMapComponent({
  collaborators = [],
  showAnimation = true,
  className = "",
  dataTinaField,
}: SpainMapComponentProps) {
  // const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  // const [selectedCity, setSelectedCity] = useState<string | null>(null);
  // const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // const isMobile = windowSize.width < 640;

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   };

  //   if (typeof window !== "undefined") {
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  // const getMapConfig = () => {
  //   if (isMobile) {
  //     return { center: [-3.0, 40.0] as [number, number], zoom: 4 };
  //   }
  //   return { center: [-3.0, 40.0] as [number, number], zoom: 5 };
  // };

  // const mapConfig = getMapConfig();

  // const getCollaboratorsForCity = (cityName: string): Collaborator[] => {
  //   return collaborators?.filter((c) => c.collaborator_city === cityName);
  // };

  // const citiesWithCollaborators = SPANISH_CITIES.filter((city) => {
  //   return getCollaboratorsForCity(city.name).length > 0;
  // });

  // return (
  //   <div className={`w-full ${className}`}>
  //     <div className="relative">
  //       <ComposableMap
  //         projection="geoMercator"
  //         projectionConfig={{
  //           scale: 2000,
  //           center: mapConfig.center,
  //         }}
  //         width={800}
  //         height={600}
  //         className="w-full h-auto"
  //       >
  //         <ZoomableGroup center={mapConfig.center} zoom={mapConfig.zoom}>
  //           <Geographies geography={geoUrl}>
  //             {({ geographies }) =>
  //               geographies
  //                 .filter((geo) => geo.properties.name === "Spain")
  //                 .map((geo) => (
  //                   <Geography
  //                     key={geo.rsmKey}
  //                     geography={geo}
  //                     fill="oklch(var(--b2))"
  //                     stroke="oklch(var(--bc) / 0.2)"
  //                     strokeWidth={0.5}
  //                     style={{
  //                       default: { outline: "none" },
  //                       hover: { outline: "none", fill: "oklch(var(--b3))" },
  //                       pressed: { outline: "none" },
  //                     }}
  //                   />
  //                 ))
  //             }
  //           </Geographies>

  //           {citiesWithCollaborators.map((city) => {
  //             const cityCollaborators = getCollaboratorsForCity(city.name);
  //             const isHovered = hoveredCity === city.name;
  //             const isSelected = selectedCity === city.name;

  //             return (
  //               <Marker
  //                 key={city.name}
  //                 coordinates={city.coordinates}
  //                 onMouseEnter={() => setHoveredCity(city.name)}
  //                 onMouseLeave={() => setHoveredCity(null)}
  //                 onClick={() => setSelectedCity(isSelected ? null : city.name)}
  //               >
  //                 {showAnimation ? (
  //                   <motion.g
  //                     initial={{ scale: 0, opacity: 0 }}
  //                     animate={{ scale: 1, opacity: 1 }}
  //                     transition={{
  //                       delay: Math.random() * 0.5,
  //                       duration: 0.5,
  //                     }}
  //                   >
  //                     <circle
  //                       r={isHovered || isSelected ? 8 : 6}
  //                       fill="oklch(var(--p))"
  //                       stroke="oklch(var(--pc))"
  //                       strokeWidth={2}
  //                       className="cursor-pointer transition-all duration-200"
  //                       style={{
  //                         filter:
  //                           isHovered || isSelected
  //                             ? "brightness(1.2)"
  //                             : "none",
  //                       }}
  //                     />
  //                     {cityCollaborators.length > 1 && (
  //                       <text
  //                         textAnchor="middle"
  //                         y={-12}
  //                         style={{
  //                           fontFamily: "system-ui",
  //                           fontSize: 10,
  //                           fill: "oklch(var(--bc))",
  //                           fontWeight: "bold",
  //                         }}
  //                       >
  //                         {cityCollaborators.length}
  //                       </text>
  //                     )}
  //                   </motion.g>
  //                 ) : (
  //                   <g>
  //                     <circle
  //                       r={isHovered || isSelected ? 8 : 6}
  //                       fill="oklch(var(--p))"
  //                       stroke="oklch(var(--pc))"
  //                       strokeWidth={2}
  //                       className="cursor-pointer transition-all duration-200"
  //                     />
  //                     {cityCollaborators.length > 1 && (
  //                       <text
  //                         textAnchor="middle"
  //                         y={-12}
  //                         style={{
  //                           fontFamily: "system-ui",
  //                           fontSize: 10,
  //                           fill: "oklch(var(--bc))",
  //                           fontWeight: "bold",
  //                         }}
  //                       >
  //                         {cityCollaborators.length}
  //                       </text>
  //                     )}
  //                   </g>
  //                 )}
  //               </Marker>
  //             );
  //           })}
  //         </ZoomableGroup>
  //       </ComposableMap>

  //       {selectedCity && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           exit={{ opacity: 0, y: 20 }}
  //           className="mt-6"
  //         >
  //           <div className="flex items-center justify-between mb-4">
  //             <h5 className="text-xl font-semibold">
  //               Colaboradores en {selectedCity}
  //             </h5>
  //             <button
  //               onClick={() => setSelectedCity(null)}
  //               className="btn btn-ghost btn-sm btn-circle"
  //             >
  //               ✕
  //             </button>
  //           </div>
  //           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  //             {getCollaboratorsForCity(selectedCity).map(
  //               (collaborator, idx) => (
  //                 <div
  //                   key={collaborator.id || idx}
  //                   className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-300"
  //                 >
  //                   <div className="card-body p-4">
  //                     <h6 className="card-title text-base text-primary mb-2">
  //                       {collaborator.collaborator_name}
  //                     </h6>
  //                     <div className="space-y-2">
  //                       <div className="text-sm">
  //                         <span className="text-base-content/70">Área: </span>
  //                         <span className="font-medium text-base-content">
  //                           {collaborator.collaborator_specialty}
  //                         </span>
  //                       </div>
  //                       {collaborator.collaborator_mainFocus && (
  //                         <div className="text-sm text-base-content/80">
  //                           {collaborator.collaborator_mainFocus}
  //                         </div>
  //                       )}
  //                       {collaborator.collaborator_experience && (
  //                         <div className="text-xs text-base-content/60">
  //                           {collaborator.collaborator_experience}
  //                         </div>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               )
  //             )}
  //           </div>
  //         </motion.div>
  //       )}
  //     </div>
  //   </div>
  // );

  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isMobile = windowSize.width < 640;

  // Handle collaborator contact
  const handleCollaboratorContact = (collaborator: Collaborator) => {
    // Here you can implement the contact functionality
    // For example, open a modal, send an email, etc.
    console.log(`Contacting ${collaborator.collaborator_name}`);
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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Set initial size
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
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
      height: isMobile ? 400 : 500,
    };
  };

  const mapConfig = getMapConfig();

  // Get collaborators for a specific city
  const getCollaboratorsForCity = (cityName: string) => {
    return collaborators?.filter((collaborator) =>
      collaborator.collaborator_cities?.includes(cityName)
    );
  };

  const citiesWithCollaborators = SPANISH_CITIES.filter((city) => {
    return getCollaboratorsForCity(city.name)?.length > 0;
  });

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
          aspectRatio: "16/10",
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
                console.log(
                  "Spain not found. Available geographies:",
                  geographies.slice(0, 5).map((g) => ({
                    id: g.id,
                    properties: Object.keys(g.properties),
                    sampleProps: {
                      NAME: g.properties.NAME,
                      NAME_EN: g.properties.NAME_EN,
                      ADMIN: g.properties.ADMIN,
                      ISO_A2: g.properties.ISO_A2,
                    },
                  }))
                );

                // Fallback: try to find Spain in different ways
                const fallbackSpain = geographies.find((geo) =>
                  Object.values(geo.properties).some(
                    (value) =>
                      typeof value === "string" &&
                      value.toLowerCase().includes("spain")
                  )
                );

                if (fallbackSpain) {
                  console.log(
                    "Found Spain via fallback:",
                    fallbackSpain.properties
                  );
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
          {citiesWithCollaborators.map((city, index) => (
            <Marker
              key={city.name}
              coordinates={city.coordinates}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() =>
                setSelectedCity(selectedCity === city.name ? null : city.name)
              }
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
                    stiffness: 100,
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
                      opacity: [0, 0.8, 0.2, 0.8],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.8 + index * 0.15, // Slightly after main marker appears
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0,
                      ease: "easeInOut",
                    }}
                    className="hidden sm:block" // Hide pulsing rings on mobile to reduce clutter
                  />

                  {/* Main marker - bigger for mobile, different colors for selected */}
                  <motion.circle
                    r={
                      hoveredCity === city.name
                        ? isMobile
                          ? 12
                          : 8
                        : isMobile
                        ? 10
                        : 6
                    }
                    fill={
                      selectedCity === city.name
                        ? "hsl(var(--p))"
                        : "hsl(var(--p))"
                    }
                    stroke={
                      selectedCity === city.name ? "hsl(var(--pf))" : "white"
                    }
                    strokeWidth={selectedCity === city.name ? 3 : 2}
                    className="cursor-pointer"
                    animate={{
                      r:
                        hoveredCity === city.name
                          ? isMobile
                            ? 12
                            : 8
                          : isMobile
                          ? 10
                          : 6,
                      fill:
                        selectedCity === city.name
                          ? "hsl(var(--pf))"
                          : "hsl(var(--p))",
                      stroke:
                        selectedCity === city.name ? "hsl(var(--p))" : "white",
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
                      duration: 0.5,
                    }}
                    animate={{
                      fontSize:
                        hoveredCity === city.name
                          ? isMobile
                            ? "16px"
                            : "18px"
                          : isMobile
                          ? "14px"
                          : "16px",
                    }}
                  >
                    {city.name}
                  </motion.text>
                </motion.g>
              ) : (
                <g>
                  <circle
                    r={isMobile ? 8 : 6}
                    fill={
                      selectedCity === city.name
                        ? "hsl(var(--pf))"
                        : "hsl(var(--p))"
                    }
                    stroke={
                      selectedCity === city.name ? "hsl(var(--p))" : "white"
                    }
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
          style={{
            position: "fixed",
            ...(mousePosition.x + 350 > windowSize.width
              ? { right: `${windowSize.width - mousePosition.x + 20}px` }
              : { left: `${mousePosition.x + 20}px` }),
            ...(mousePosition.y + 200 > windowSize.height
              ? { bottom: `${windowSize.height - mousePosition.y + 20}px` }
              : { top: `${mousePosition.y + 20}px` }),
            pointerEvents: "none",
          }}
          className="bg-base-100 shadow-lg rounded-lg p-4 
                       max-w-xs text-sm
                       z-50"
        >
          {(() => {
            const city = SPANISH_CITIES.find((c) => c.name === hoveredCity);
            if (!city) return null;

            const cityCollaborators = getCollaboratorsForCity(city.name);

            return (
              <>
                <h4 className="font-bold text-lg text-primary mb-1">
                  {city.name}
                </h4>
                <p className="text-sm leading-relaxed mb-2">
                  {city.description}
                </p>
                <div className="mt-2 pt-2 border-t border-base-300">
                  <p className="text-xs text-base-content/60">
                    {cityCollaborators.length} colaborador
                    {cityCollaborators.length !== 1 ? "es" : ""} en esta región
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
          className="absolute z-1 bg-base-100 shadow-xl rounded-lg top-4 right-4 max-w-sm"
        >
          {(() => {
            const city = SPANISH_CITIES.find((c) => c.name === selectedCity);
            if (!city) return null;

            const cityCollaborators = getCollaboratorsForCity(city.name);

            return (
              <div className="p-4">
                {/* Header with close button */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-primary">
                    {city.name}
                  </h4>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="btn btn-sm btn-ghost btn-circle"
                    aria-label="Cerrar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-sm leading-relaxed mb-4">
                  {city.description}
                </p>

                {/* Simple collaborator count */}
                <div className="border-t border-base-300 pt-3">
                  <div className="flex items-center justify-between flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {cityCollaborators.length} colaborador
                      {cityCollaborators.length !== 1 ? "es" : ""} en esta
                      región
                    </span>
                    <span className="text-xs text-base-content/60 italic">
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
              const city = SPANISH_CITIES.find((c) => c.name === selectedCity);
              const cityCollaborators = getCollaboratorsForCity(selectedCity);

              return (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">{city?.name}</h4>
                    <p className="text-sm text-base-content/70">
                      {cityCollaborators.length} colaborador
                      {cityCollaborators.length !== 1 ? "es" : ""} en esta
                      región
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

        {
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-base-content/60 my-6"
          >
            Haz clic en cualquier ciudad del mapa para filtrar por región
          </motion.p>
        }

        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold">
            {selectedCity
              ? `Colaboradores en ${selectedCity}`
              : "Todos nuestros colaboradores"}
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

        <div
          className={`grid gap-4 ${
            selectedCity
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" // Bigger cards when filtered
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" // Smaller cards when showing all
          }`}
        >
          {(() => {
            const collaboratorsToShow = selectedCity
              ? collaborators?.filter((collaborator) =>
                  collaborator.collaborator_cities?.includes(selectedCity)
                )
              : collaborators;

            return collaboratorsToShow?.map((collaborator, idx) => (
              <CollaboratorCard
                key={collaborator.collaborator_name}
                collaborator={collaborator}
                mode={selectedCity ? "extended" : "minified"}
                animationDelay={idx * 0.1}
                onContact={handleCollaboratorContact}
                onSelectCity={setSelectedCity}
                selectedCity={selectedCity}
                dataTinaField={`${dataTinaField}.interactive_map_collaborators.${idx}`}
              />
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
