"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import NavLinks from "./NavLinks";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Function to close menu when navigating
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="w-full sticky top-0 z-20 shadow-md bg-base-100">
      {" "}
      {/* Could be glass styled */}
      <div className="relative">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <Link href="/old" className="text-3xl font-serif font-bold" onClick={handleLinkClick}>
            CGC
          </Link>
          <div className="text-sm font-serif md:hidden lg:block">
            Luis Cruz
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks layout="horizontal" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      </div>
      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 w-full md:hidden bg-base-100 shadow-lg border-t border-base-200 overflow-hidden"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavLinks layout="vertical" showButton={true} onLinkClick={handleLinkClick} />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}
