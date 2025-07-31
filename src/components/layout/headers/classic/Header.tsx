"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import NavLinks from "./NavLinks";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-20 shadow-md bg-base-100">
      {" "}
      {/* Could be glass styled */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-3xl font-serif font-bold">
            Luis Cruz
          </Link>
          <div className="text-sm font-serif md:hidden lg:block">
            Abogado en derecho
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
      {isMenuOpen && (
        <div className="md:hidden">
          <NavLinks layout="vertical" showButton={true} />
        </div>
      )}
    </header>
  );
}
