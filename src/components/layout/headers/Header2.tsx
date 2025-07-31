"use client";

import NavItem from "@/components/ui/nav/NavItem";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface IHeader2Props {}

export default function Header2(props: IHeader2Props) {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const logoControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);
    };

    // Set initial scroll state on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate header height
  useEffect(() => {
    controls.start({
      height: scrolled ? 64 : 96,
      transition: { duration: 0.3, ease: "easeInOut" },
    });

    logoControls.start({
      x: scrolled ? 0 : "0%",
      translateX: scrolled ? "0%" : "-50%",
      scale: scrolled ? 0.85 : 1,
      alignSelf: scrolled ? "flex-start" : "center",
      transition: { duration: 0.3 },
    });
  }, [scrolled, controls, logoControls]);

  return (
    <motion.header
      animate={controls}
      className="sticky top-0 left-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left Navigation */}
        <nav className="flex gap-6">
          <NavItem href="/about" label="About" />
          <NavItem href="/services" label="Services" />
        </nav>

        {/* Logo */}
        <motion.div
          animate={logoControls}
          className="absolute left-1/2 top-1/2 -translate-y-1/2"
          style={{ transformOrigin: "center" }}
        >
          <Link
            href="/"
            className="text-2xl font-bold text-primary transition hover:text-primary/80"
          >
            Logo
          </Link>
        </motion.div>

        {/* Right Navigation */}
        <nav className="flex gap-6">
          <NavItem href="/projects" label="Projects" />
          <NavItem href="/contact" label="Contact" />
        </nav>
      </div>
    </motion.header>
  );
}
