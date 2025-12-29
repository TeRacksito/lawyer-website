"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { tinaField } from "tinacms/dist/react";
import HeaderNavLinks from "./HeaderNavLinks";

interface HeaderBlockProps {
  data: {
    logo?: string | null;
    logoSubtext?: string | null;
    logoTagline?: string | null;
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
  const {
    logo,
    logoSubtext,
    logoTagline,
    logoImage,
    navigation,
    ctaButton,
    isSticky = true,
  } = data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const distanceFromBottom = docHeight - scrollTop;

      // setIsScrolled(scrollTop > 100 && distanceFromBottom > 100);
      if (scrollTop > 100 && distanceFromBottom > 100) {
        setIsScrolled(true);
      }

      if (scrollTop <= 50 || distanceFromBottom <= 50) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`w-full z-20 shadow-md bg-base-100/70 rounded-none backdrop-blur-lg ${
        isSticky ? "sticky top-0" : ""
      }`}
      data-tina-field={dataTinaField}
    >
      <div className="relative">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-4"
              onClick={handleLinkClick}
            >
              <Image
                src="/clg.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
                className={`transition-all duration-300 overflow-hidden max-h-14 ${
                  isScrolled ? "w-15" : "w-20"
                }`}
              />
            </Link>
            {logoSubtext && (
              <div className="hidden md:hidden lg:flex flex-col leading-tight">
                <span
                  className="text-base font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
                  data-tina-field={tinaField(data, "logoSubtext")}
                >
                  {logoSubtext}
                </span>
                {logoTagline && (
                  <span
                    className="text-xs text-primary font-medium"
                    data-tina-field={tinaField(data, "logoTagline")}
                  >
                    {logoTagline}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <HeaderNavLinks
              navigation={navigation}
              ctaButton={ctaButton}
              layout="horizontal"
              data={data}
              isScrolled={isScrolled}
            />
          </div>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
        </div>

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
