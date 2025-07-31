'use client';

import { motion, Variants } from 'framer-motion';

const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function LandingSection() {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="text-2xl font-bold p-4"
    >
      Welcome to the Slide Up World!
    </motion.div>
  );
}
