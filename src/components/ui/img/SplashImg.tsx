'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export interface ISplashImgProps {
  src: string;
}

export default function SplashImg (props: ISplashImgProps) {
    const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative w-96 h-64 cursor-pointer overflow-hidden rounded-xl bg-black"
      onClick={() => setVisible(!visible)}
    >
      <AnimatePresence>
        {visible && (
          <motion.img
            key="inked-image"
            src={props.src}
            initial={{
              clipPath: 'circle(0% at 50% 50%)',
              opacity: 0.2,
              scale: 1.05,
            }}
            animate={{
              clipPath: 'circle(150% at 50% 50%)',
              opacity: 1,
              scale: 1,
            }}
            exit={{
              clipPath: 'circle(0% at 50% 50%)',
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
