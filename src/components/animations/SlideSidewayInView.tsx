"use client";

import { ANIMATIONS_BASE_DURATION } from "@/constants/animations";
import { motion } from "framer-motion";
import { memo } from "react";

interface SlideSidewayInViewProps {
  children: React.ReactNode;
  initialOpacity?: number;
  initialX?: number;
  duration?: number;
  delay?: number;
}

const SlideSidewayInView = memo((props: SlideSidewayInViewProps) => {
  const {
    children,
    initialOpacity = 0,
    initialX = -50,
    duration = ANIMATIONS_BASE_DURATION?.SIDE_WAYS,
  } = props;

  return (
    <motion.div
      initial={{ opacity: initialOpacity, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: duration, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
});

SlideSidewayInView.displayName = 'SlideSidewayInView';

export default SlideSidewayInView;
