"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { tinaField } from "tinacms/dist/react";
import HeaderNavLinks from "./HeaderNavLinks";

interface HeaderBlockProps {
  data: {
    logo?: string | null;
    logoSubtext?: string | null;
    logoImage?: string | null;
    navigation?: Array<{
      label?: string | null;
      href?: string | null;
      isExternal?: boolean | null;
    }> | null;
    ctaButton?: {
      text?: string | null;
      href?: string | null;
      show?: boolean | null;
    } | null;
    isSticky?: boolean | null;
  };
  dataTinaField?: string;
}

export default function HeaderBlock({ data, dataTinaField }: HeaderBlockProps) {
  const { logo, logoSubtext, logoImage, navigation, ctaButton, isSticky = true } = data;
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

  const headerClasses = `w-full z-20 shadow-md bg-base-100 ${
    isSticky ? 'sticky top-0' : ''
  }`;

  return (
    <header ref={headerRef} className={headerClasses} data-tina-field={dataTinaField}>
      <div className="relative">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
          {/* Logo and Name */}
          <div className="flex items-center gap-4" data-tina-field={tinaField(data, "logo")}>
            <Link href="/" className="flex items-center gap-4" onClick={handleLinkClick}>
              {logoImage && (
                <div data-tina-field={tinaField(data, "logoImage")}>
                  <Image
                    src={logoImage}
                    alt={logo || "Logo"}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
              )}
              {logo && (
                <span className="text-3xl font-serif font-bold">{logo}</span>
              )}
            </Link>
            {logoSubtext && (
              <div 
                className="text-sm font-serif md:hidden lg:block"
                data-tina-field={tinaField(data, "logoSubtext")}
              >
                {logoSubtext}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <HeaderNavLinks 
              navigation={navigation}
              ctaButton={ctaButton}
              layout="horizontal"
              data={data}
            />
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
              <HeaderNavLinks 
                navigation={navigation}
                ctaButton={ctaButton}
                layout="vertical" 
                onLinkClick={handleLinkClick}
                data={data}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
