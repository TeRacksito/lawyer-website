import { motion } from "framer-motion";

export interface IHeroTitleProps {
  title: string;
  titleDataTinaField?: string;
  subtitle: string;
  subtitleDataTinaField?: string;
}

export default function HeroTitle(props: IHeroTitleProps) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-24 md:w-36 h-0.5 bg-primary"
      />
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-serif font-bold text-primary text-nowrap"
        data-tina-field={props.titleDataTinaField}
      >
        {props.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-base md:text-xl font-light text-muted"
        data-tina-field={props.subtitleDataTinaField}
      >
        {props.subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-                                                                                                                                                                 24 md:w-36 h-0.5 bg-primary"
      />
    </div>
  );
}
