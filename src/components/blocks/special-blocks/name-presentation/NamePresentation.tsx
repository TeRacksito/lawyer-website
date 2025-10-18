"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AcronymWord {
  letter: string;
  word: string;
  description: string;
}

interface Pillar {
  letter: string;
  title: string;
  description: string;
}

interface NamePresentationProps {
  data: {
    acronym?: string;
    acronymWords?: AcronymWord[];
    fullName?: string;
    tagline?: string;
  };
  dataTinaField?: string;
}

export default function NamePresentation({
  data,
  dataTinaField,
}: NamePresentationProps) {
  const {
    acronym = "CGC",
    acronymWords = [],
    fullName = "Luis Cruz",
    tagline = "Donde la excelencia legal se encuentra con el compromiso humano",
  } = data;

  const [animationPhase, setAnimationPhase] = useState(0);
  const [showDescriptionSection, setShowDescriptionSection] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isRepeatedVisit, setIsRepeatedVisit] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 455);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const STORAGE_KEY = "namePresentationLastView";
    const lastView = localStorage.getItem(STORAGE_KEY);

    const now = Date.now();
    const isRecent = lastView && now - parseInt(lastView) < 24 * 60 * 60 * 1000;
    setIsRepeatedVisit(!!isRecent);
  }, []);

  useEffect(() => {
    const speedMultiplier = isRepeatedVisit ? 0.5 : 1;

    const timer1 = setTimeout(
      () => setAnimationPhase(1),
      500 * speedMultiplier
    );
    const timer2 = setTimeout(
      () => setAnimationPhase(2),
      1000 * speedMultiplier
    );
    const timer3 = setTimeout(
      () => setAnimationPhase(3),
      2000 * speedMultiplier
    );
    const timer4 = setTimeout(
      () => setAnimationPhase(4),
      2600 * speedMultiplier
    );
    const timer5 = setTimeout(() => {
      setShowDescriptionSection(true);
      const STORAGE_KEY = "namePresentationLastView";
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }, 3700 * speedMultiplier);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isRepeatedVisit]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8 * (isRepeatedVisit ? 0.5 : 1),
        staggerChildren: 0.1 * (isRepeatedVisit ? 0.5 : 1),
      },
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
      <div className="text-center mb-20 relative max-w-full">
        <motion.div className="flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase >= 2 ? 0.05 : 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          </motion.div>

          <div className="relative w-full max-w-2xl sm:max-w-4xl lg:max-w-6xl px-2 sm:px-4">
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animationPhase >= 4 ? 1 : 0,
                y: animationPhase >= 4 ? 0 : 20,
              }}
              transition={{
                duration: 1 * (isRepeatedVisit ? 0.5 : 1),
                delay: 1.5 * (isRepeatedVisit ? 0.5 : 1),
              }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-3"
                data-tina-field={`${dataTinaField}.acronym`}
              >
                {acronym}
              </h1>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </motion.div>

            <motion.div
              className="flex justify-center items-center relative my-20"
              style={{ height: "140px" }}
            >
              {acronymWords.map((item, index) => {
                const positions = [
                  {
                    x: animationPhase >= 2 ? -120 : 0,
                    finalX:
                      animationPhase >= 4
                        ? -160
                        : animationPhase >= 2
                        ? -120
                        : 0,
                    y: 0,
                  },
                  { x: 0, finalX: 0, y: 0 },
                  {
                    x: animationPhase >= 2 ? 120 : 0,
                    finalX:
                      animationPhase >= 4 ? 160 : animationPhase >= 2 ? 120 : 0,
                    y: 0,
                  },
                ];

                const mobilePositions = [
                  {
                    x: animationPhase >= 2 ? -70 : 0,
                    finalX:
                      animationPhase >= 4 ? -90 : animationPhase >= 2 ? -70 : 0,
                    y: animationPhase >= 3 ? -20 : 0,
                  },
                  {
                    x: 0,
                    finalX: 0,
                    y: 0,
                  },
                  {
                    x: animationPhase >= 2 ? 70 : 0,
                    finalX:
                      animationPhase >= 4 ? 90 : animationPhase >= 2 ? 70 : 0,
                    y: animationPhase >= 3 ? 20 : 0,
                  },
                ];

                const currentPositions = isSmallScreen
                  ? mobilePositions
                  : positions;
                const position = currentPositions[index] || {
                  x: 0,
                  finalX: 0,
                  y: 0,
                };

                return (
                  <motion.div
                    key={item.letter + index}
                    className="absolute flex flex-col items-center"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                      opacity: animationPhase >= 1 ? 1 : 0,
                      y:
                        animationPhase >= 1
                          ? isSmallScreen
                            ? position.y
                            : 0
                          : 50,
                      scale: animationPhase >= 1 ? 1 : 0.8,
                      x: position.finalX,
                    }}
                    transition={{
                      duration:
                        animationPhase === 1
                          ? 0.8 * (isRepeatedVisit ? 0.5 : 1)
                          : 1.2 * (isRepeatedVisit ? 0.5 : 1),
                      delay:
                        animationPhase === 1
                          ? index * 0.2 * (isRepeatedVisit ? 0.5 : 1)
                          : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.span
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-primary block"
                      style={{
                        fontSize: isSmallScreen ? "2.5rem" : undefined,
                      }}
                      animate={{
                        scale: animationPhase >= 4 ? 0.8 : 1,
                      }}
                      transition={{
                        duration: 1 * (isRepeatedVisit ? 0.5 : 1),
                        ease: "easeInOut",
                      }}
                      data-tina-field={`${dataTinaField}.acronymWords.${index}.letter`}
                    >
                      {item.letter}
                    </motion.span>

                    <motion.div
                      className="absolute top-16 sm:top-18 md:top-20 lg:top-28 text-center"
                      style={{
                        top: isSmallScreen ? "3rem" : undefined,
                        transform:
                          isSmallScreen && index === 0
                            ? "translateY(-8px)"
                            : isSmallScreen && index === 2
                            ? "translateY(8px)"
                            : undefined,
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: animationPhase >= 3 ? 1 : 0,
                        y: animationPhase >= 3 ? 0 : -10,
                      }}
                      transition={{
                        duration: 0.8 * (isRepeatedVisit ? 0.5 : 1),
                        delay: index * 0.2 * (isRepeatedVisit ? 0.5 : 1),
                      }}
                    >
                      <div
                        className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-base-content"
                        style={{
                          fontSize: isSmallScreen ? "0.75rem" : undefined,
                        }}
                        data-tina-field={`${dataTinaField}.acronymWords.${index}.word`}
                      >
                        {item.word}
                      </div>
                      <div
                        className="text-xs md:text-sm text-base-content/60 mt-1 max-w-28 sm:max-w-32 md:max-w-36"
                        style={{
                          fontSize: isSmallScreen ? "0.625rem" : undefined,
                          maxWidth: isSmallScreen ? "4rem" : undefined,
                          lineHeight: isSmallScreen ? "0.75rem" : undefined,
                        }}
                        data-tina-field={`${dataTinaField}.acronymWords.${index}.description`}
                      >
                        {item.description}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none top-20 sm:top-18 md:top-14 lg:top-10 xl:top-8"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: animationPhase >= 4 ? 0.15 : 0,
                scale: animationPhase >= 4 ? 1 : 1.1,
              }}
              transition={{
                duration: 2 * (isRepeatedVisit ? 0.5 : 1),
                ease: "easeOut",
              }}
            >
              <div
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-serif font-light text-primary text-center leading-tight tracking-wider select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontVariant: "small-caps",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 40px rgba(168, 85, 247, 0.1)",
                  filter: "blur(0.5px)",
                  fontSize: isSmallScreen ? "1.5rem" : undefined,
                }}
              >
                <div
                  className="opacity-60 text-nowrap"
                  data-tina-field={`${dataTinaField}.fullName`}
                >
                  {fullName}
                </div>
              </div>

              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 text-primary/20"
                style={{
                  top: isSmallScreen ? "-1rem" : undefined,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: animationPhase >= 4 ? (isSmallScreen ? 0.7 : 1) : 0,
                }}
                transition={{
                  duration: 1.5 * (isRepeatedVisit ? 0.5 : 1),
                  delay: 1 * (isRepeatedVisit ? 0.5 : 1),
                }}
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
                  bottom: isSmallScreen ? "-1rem" : undefined,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: animationPhase >= 4 ? (isSmallScreen ? 0.7 : 1) : 0,
                }}
                transition={{
                  duration: 1.5 * (isRepeatedVisit ? 0.5 : 1),
                  delay: 1.2 * (isRepeatedVisit ? 0.5 : 1),
                }}
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

            <motion.svg
              className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
              style={{
                top: "120px",
                zIndex: 1,
              }}
              height="60"
              viewBox="0 0 400 60"
              preserveAspectRatio="xMidYMid meet"
              initial={{ opacity: 0 }}
              animate={{
                opacity: animationPhase >= 4 ? (isSmallScreen ? 0.3 : 0.4) : 0,
              }}
              transition={{ duration: 1 * (isRepeatedVisit ? 0.5 : 1) }}
            >
              <motion.path
                d={
                  isSmallScreen
                    ? "M 110 15 Q 140 25 170 30"
                    : "M 80 30 Q 120 20 160 30"
                }
                stroke="currentColor"
                strokeWidth={isSmallScreen ? "1" : "1.5"}
                fill="none"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationPhase >= 4 ? 1 : 0 }}
                transition={{
                  duration: 1.2 * (isRepeatedVisit ? 0.5 : 1),
                  delay: 0.5 * (isRepeatedVisit ? 0.5 : 1),
                }}
              />

              <motion.path
                d={
                  isSmallScreen
                    ? "M 230 30 Q 260 35 300 45"
                    : "M 240 30 Q 280 20 320 30"
                }
                stroke="currentColor"
                strokeWidth={isSmallScreen ? "1" : "1.5"}
                fill="none"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationPhase >= 4 ? 1 : 0 }}
                transition={{
                  duration: 1.2 * (isRepeatedVisit ? 0.5 : 1),
                  delay: 0.7 * (isRepeatedVisit ? 0.5 : 1),
                }}
              />
            </motion.svg>

            <motion.div
              className="flex justify-center items-center relative text-center md:pt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 4 ? 1 : 0 }}
              transition={{
                duration: 1 * (isRepeatedVisit ? 0.5 : 1),
                delay: 2 * (isRepeatedVisit ? 0.5 : 1),
              }}
            >
              <p
                className="text-sm sm:text-base md:text-lg text-base-content/80 font-medium tracking-wide max-w-xs sm:max-w-sm md:max-w-md px-2 sm:px-4"
                data-tina-field={`${dataTinaField}.tagline`}
              >
                {tagline}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
