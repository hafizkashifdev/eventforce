"use client";

import { ANIMATIONS_BASE_DURATION } from "@/constants/animations";
import { motion } from "framer-motion";
import { memo } from "react";

interface ScaleInViewProps {
  children: React.ReactNode;
  initialOpacity?: number;
  initialScale?: number;
  duration?: number;
  delay?: number;
}

const ScaleInView = memo((props: ScaleInViewProps) => {
  const {
    children,
    initialOpacity = 0,
    initialScale = 0,
    duration = ANIMATIONS_BASE_DURATION?.SCALE,
  } = props;
  return (
    <motion.div
      initial={{ opacity: initialOpacity, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
});

ScaleInView.displayName = 'ScaleInView';

export default ScaleInView;
