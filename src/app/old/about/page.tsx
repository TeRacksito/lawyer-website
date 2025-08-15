"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check screen size and set up listener
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 455);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 500); // Letters appear
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000); // Letters spread
    const timer3 = setTimeout(() => setAnimationPhase(3), 2500); // Words appear
    const timer4 = setTimeout(() => setAnimationPhase(4), 3500); // Full reveal
    const timer5 = setTimeout(() => setShowDescription(true), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col justify-center px-4 overflow-hidden"
    >
      {/* Integrated Logo to Full Name Animation */}
      <div className="text-center mb-20 relative max-w-full">
        <motion.div className="flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background Elegant Pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase >= 2 ? 0.05 : 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          </motion.div>

          {/* Main Animation Container */}
          <div className="relative w-full max-w-2xl sm:max-w-4xl lg:max-w-6xl px-2 sm:px-4">
            {/* Final CGC Title - Top */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animationPhase >= 4 ? 1 : 0,
                y: animationPhase >= 4 ? 0 : 20,
              }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{ minHeight: "600px" }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-3"
              >
                CGC
              </h1>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </motion.div>

            {/* CGC Letters Row - Center */}
            <motion.div
              className="flex justify-center items-center relative my-20"
              style={{ height: "140px" }}
            >
              {["C", "G", "C"].map((letter, index) => {
                // Responsive positioning based on viewport width
                const getResponsivePosition = (basePosition: number) => {
                  // Use vw units for responsive scaling, with minimum/maximum bounds
                  return `min(max(${basePosition * 0.8}px, ${basePosition * 0.15}vw), ${basePosition}px)`;
                };

                const positions = [
                  {
                    x: animationPhase >= 2 ? -120 : 0, // Reduced from -150
                    finalX: animationPhase >= 4 ? -160 : animationPhase >= 2 ? -120 : 0, // Reduced from -220/-150
                    y: 0,
                  }, // C
                  { x: 0, finalX: 0, y: 0 }, // G
                  {
                    x: animationPhase >= 2 ? 120 : 0, // Reduced from 150
                    finalX: animationPhase >= 4 ? 160 : animationPhase >= 2 ? 120 : 0, // Reduced from 220/150
                    y: 0,
                  }, // C
                ];

                // Ultra-compact positioning for very small screens
                const mobilePositions = [
                  {
                    x: animationPhase >= 2 ? -70 : 0,
                    finalX: animationPhase >= 4 ? -90 : animationPhase >= 2 ? -70 : 0,
                    y: animationPhase >= 3 ? -20 : 0, // Slightly higher
                  }, // C
                  { 
                    x: 0, 
                    finalX: 0,
                    y: 0, // Center stays centered
                  }, // G
                  {
                    x: animationPhase >= 2 ? 70 : 0,
                    finalX: animationPhase >= 4 ? 90 : animationPhase >= 2 ? 70 : 0,
                    y: animationPhase >= 3 ? 20 : 0, // Slightly lower
                  }, // C
                ];

                // Use mobile positions for screens smaller than 640px
                const currentPositions = isSmallScreen ? mobilePositions : positions;

                return (
                  <motion.div
                    key={letter + index}
                    className="absolute flex flex-col items-center"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                      opacity: animationPhase >= 1 ? 1 : 0,
                      y: animationPhase >= 1 ? (isSmallScreen ? currentPositions[index].y : 0) : 50,
                      scale: animationPhase >= 1 ? 1 : 0.8,
                      x: currentPositions[index].finalX,
                    }}
                    transition={{
                      duration: animationPhase === 1 ? 0.8 : 1.2,
                      delay: animationPhase === 1 ? index * 0.2 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Letter */}
                    <motion.span
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-primary block"
                      style={{ 
                        fontSize: isSmallScreen ? '2.5rem' : undefined // 40px for small screens
                      }}
                      animate={{
                        scale: animationPhase >= 4 ? 0.8 : 1,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      {letter}
                    </motion.span>

                    {/* Word appears below each letter */}
                    <motion.div
                      className="absolute top-16 sm:top-18 md:top-20 lg:top-28 text-center"
                      style={{
                        top: isSmallScreen ? '3rem' : undefined, // 48px for small screens
                        // Add extra spacing for tilted layout
                        transform: isSmallScreen && index === 0 ? 'translateY(-8px)' : 
                                  isSmallScreen && index === 2 ? 'translateY(8px)' : undefined,
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: animationPhase >= 3 ? 1 : 0,
                        y: animationPhase >= 3 ? 0 : -10,
                      }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <div 
                        className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-base-content"
                        style={{
                          fontSize: isSmallScreen ? '0.75rem' : undefined // 12px for small screens
                        }}
                      >
                        {index === 0 && "Consultas"}
                        {index === 1 && "Gratuitas"}
                        {index === 2 && "Cruz"}
                      </div>
                      <div 
                        className="text-xs md:text-sm text-base-content/60 mt-1 max-w-28 sm:max-w-32 md:max-w-36"
                        style={{
                          fontSize: isSmallScreen ? '0.625rem' : undefined, // 10px for small screens
                          maxWidth: isSmallScreen ? '4rem' : undefined, // 64px for small screens
                          lineHeight: isSmallScreen ? '0.75rem' : undefined
                        }}
                      >
                        {index === 0 && "Primera consulta sin costo"}
                        {index === 1 && "Sin compromiso inicial"}
                        {index === 2 && "Luis Cruz, fundador"}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center "Luis Cruz" - Classical Background Typography */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none top-20 sm:top-18 md:top-14 lg:top-10 xl:top-8 -z-10"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: animationPhase >= 4 ? 0.15 : 0,
                scale: animationPhase >= 4 ? 1 : 1.1,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-serif font-light text-primary text-center leading-tight tracking-wider select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontVariant: "small-caps",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 40px rgba(168, 85, 247, 0.1)",
                  filter: "blur(0.5px)",
                  fontSize: isSmallScreen ? '1.5rem' : undefined, // 24px for small screens
                }}
              >
                <div className="opacity-60 text-nowrap">Luis Cruz</div>
              </div>

              {/* Classical ornamental flourishes */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 text-primary/20"
                style={{
                  top: isSmallScreen ? '-1rem' : undefined, // -16px for small screens
                }}
                initial={{ scale: 0 }}
                animate={{ scale: animationPhase >= 4 ? (isSmallScreen ? 0.7 : 1) : 0 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <svg
                  width={isSmallScreen ? "60" : "80"}
                  height={isSmallScreen ? "20" : "30"}
                  viewBox="0 0 120 40"
                  className="text-primary/10 sm:w-[100px] sm:h-[35px] md:w-[120px] md:h-[40px]"
                >
                  <path
                    d="M10,20 Q30,5 50,20 Q70,35 90,20"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M15,20 Q35,10 55,20 Q75,30 95,20"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    fill="none"
                    opacity="0.4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle
                    cx="80"
                    cy="20"
                    r="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 text-primary/20"
                style={{
                  bottom: isSmallScreen ? '-1rem' : undefined, // -16px for small screens
                }}
                initial={{ scale: 0 }}
                animate={{ scale: animationPhase >= 4 ? (isSmallScreen ? 0.7 : 1) : 0 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              >
                <svg
                  width={isSmallScreen ? "60" : "80"}
                  height={isSmallScreen ? "20" : "30"}
                  viewBox="0 0 120 40"
                  className="text-primary/10 rotate-180 sm:w-[100px] sm:h-[35px] md:w-[120px] md:h-[40px]"
                >
                  <path
                    d="M10,20 Q30,5 50,20 Q70,35 90,20"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M15,20 Q35,10 55,20 Q75,30 95,20"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    fill="none"
                    opacity="0.4"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle
                    cx="80"
                    cy="20"
                    r="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Connecting Lines Animation - Responsive */}
            <motion.svg
              className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
              style={{ 
                top: "120px", // Much higher for small screens
                zIndex: 1 
              }}
              height="60"
              viewBox="0 0 400 60"
              preserveAspectRatio="xMidYMid meet"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 4 ? (isSmallScreen ? 0.3 : 0.4) : 0 }}
              transition={{ duration: 1 }}
            >
              {/* Line from left C - adjusted for mobile tilt */}
              <motion.path
                d={isSmallScreen ? "M 110 15 Q 140 25 170 30" : "M 80 30 Q 120 20 160 30"}
                stroke="currentColor"
                strokeWidth={isSmallScreen ? "1" : "1.5"}
                fill="none"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationPhase >= 4 ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />

              {/* Line to right C - adjusted for mobile tilt */}
              <motion.path
                d={isSmallScreen ? "M 230 30 Q 260 35 300 45" : "M 240 30 Q 280 20 320 30"}
                stroke="currentColor"
                strokeWidth={isSmallScreen ? "1" : "1.5"}
                fill="none"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationPhase >= 4 ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
            </motion.svg>

            {/* Professional Tagline - Bottom */}
            <motion.div
              className="flex justify-center items-center relative text-center md:pt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 4 ? 1 : 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <p className="text-sm sm:text-base md:text-lg text-base-content/80 font-medium tracking-wide max-w-xs sm:max-w-sm md:max-w-md px-2 sm:px-4">
                Donde la excelencia legal se encuentra con el compromiso humano
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={showDescription ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Story */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">
              El Significado de Nuestro Nombre
            </h2>
            <p className="text-lg leading-relaxed text-base-content/80">
              <strong className="text-primary">CGC</strong> no es solo un
              acrónimo, es nuestra filosofía. Representa nuestro compromiso
              fundamental con la accesibilidad legal:
              <em className="text-primary"> "Consultas Gratuitas Luis Cruz"</em>
              .
            </p>
            <p className="text-lg leading-relaxed text-base-content/80">
              Creemos firmemente que el acceso a la asesoría legal no debe ser
              un privilegio, sino un derecho. Por eso, nuestra primera consulta
              siempre es gratuita, permitiendo que cada persona pueda conocer
              sus opciones legales sin barreras económicas.
            </p>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-primary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Nuestros Pilares
              </h3>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={showDescription ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold">Consultas Accesibles</h4>
                    <p className="text-sm text-base-content/70">
                      Sin costos iniciales para evaluar tu caso
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={showDescription ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <h4 className="font-semibold">Gestión Transparente</h4>
                    <p className="text-sm text-base-content/70">
                      Procesos claros y comunicación honesta
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={showDescription ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold">Compromiso Personal</h4>
                    <p className="text-sm text-base-content/70">
                      Cada caso recibe atención personalizada
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showDescription ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 text-center"
        >
          <div className="bg-base-200 rounded-2xl p-8 max-w-3xl mx-auto">
            <motion.blockquote
              initial={{ scale: 0.9, opacity: 0 }}
              animate={showDescription ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="text-xl font-medium italic text-base-content/90 mb-4"
            >
              "La justicia debe ser accesible para todos. CGC nació de la
              convicción de que una consulta legal no debe ser un lujo, sino una
              herramienta fundamental para proteger los derechos de cada
              persona."
            </motion.blockquote>
            <motion.cite
              initial={{ opacity: 0 }}
              animate={showDescription ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="text-primary font-semibold"
            >
              — Luis Cruz, Fundador
            </motion.cite>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
